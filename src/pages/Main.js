import { useEffect, useState } from "react"
import SearchName from '../components/SearchName'
import SearchTag from '../components/SearchTag'

export default function Main() {
    const [studentInfo, setStudentInfo] = useState([]);
    const [clicked, setClicked] = useState([])
    const [newTagName, setNewTagName] = useState("");
    const [filterStudentName, setFilterStudentName] = useState("");
    const [tagFilter, setTagFilter] = useState("");
  
    async function fetchURL(url) {
        const response = await fetch(url);
        const data = await response.json();
        const students = data.students;
        students.forEach((student) => {
          student.tags = [];
        });
        setStudentInfo(students);
      }

      useEffect(() => {
        fetchURL(`https://api.hatchways.io/assessment/students`);
      }, []);


    const handleToggle = (id) => {
        if(clicked.includes(id)) {
            setClicked(clicked.filter(studentid => studentid !== id))
        } else {
            let newClicked = [...clicked]
            newClicked.push(id)
            setClicked(newClicked)
        }
    }

    const makeTagForStudent = (student, newTag) => {
        student.tags.push(newTag);
    
        const studentIndex = studentInfo.findIndex(s => s.id === student.id);
        let studentInfoWithEdits = [
          ...studentInfo.slice(0, studentIndex),
          student,
          ...studentInfo.slice(studentIndex + 1),
        ];
        setStudentInfo(studentInfoWithEdits);
      };

      const filterName = (filterStr) => {
        if (filterStr && filterStr.toLowerCase) {
          filterStr = filterStr.toLowerCase();
        }
        let filtered = [];
        studentInfo.forEach((student) => {
          const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    
          if (!filterStr || fullName.includes(filterStr)) {
            filtered.push(student);
          }
        });
        return filtered;
      };

      const searchTags = (inputTag) => {
        if (inputTag && inputTag.toLowerCase) {
          inputTag = inputTag.toLowerCase();
        }
    
        let tagsArrSearch = [];
        studentInfo.forEach((student) => {
          let tagExists = false;
          student.tags.forEach(t => {
            if (t.toLowerCase().includes(inputTag)) {
              tagExists = true;
            }
          });
    
          if (!inputTag || tagExists) {
            tagsArrSearch.push(student);
          }
        });
        return tagsArrSearch;
      };
    
      const studentsFilteredByName = filterName(filterStudentName);
      const studentsFilteredByTag = searchTags(tagFilter);
      const studentsFilteredCombined = [];

      studentsFilteredByName.forEach(student => {
        if (studentsFilteredByTag.includes(student)) {
          studentsFilteredCombined.push(student);
        }
      });

      return (
          <>
            <div className="flex h-screen justify-center items-center bg-gray-100">
                <div className="w-4/6 pt-16 h-5/6 bg-white shadow-md rounded-md overflow-y-scroll sm:no-scrollbar min-w-fit">
                    <div className="pb-10">
                        <SearchName 
                          placeholder="Search by name"
                          handleSearchName={setFilterStudentName}
                        />
                          <SearchTag 
                            placeholder="Search by tag"
                            handleSearchTag={setTagFilter}
                          />
                    </div>
                    {studentsFilteredCombined.map(student => (
                    <li className="flex border-solid border-b border-gray-300 pt-6 items-start justify-start pl-6 pb-3 relative" key={student.id}>
                        <div className="border-solid border border-gray-300 rounded-full">
                            <img className="w-28 rounded-full" src={student.pic} alt="student" />
                        </div>
                        <div className="pl-8">
                            <h3 className="font-bold text-2xl">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h3>
                        <div className="text-gray-500 pt-3 pl-4">
                            <p>Email: {student.email}</p>
                            <p>Company: {student.company}</p>
                            <p>Skill: {student.skill}</p>
                            <p>Average: {}
                            {student.grades.reduce((prevGrade, currentGrade) => parseInt(currentGrade) + prevGrade, 0) / student.grades.map(grade => grade).length} % 
                            </p>
                            {clicked.includes(student.id) ? (
                                <ul className="pt-5 pb-3">
                                    {student.grades.map((grade, index) => (
                                        <li key={grade.id}>
                                            Test {index + 1}: {grade}%
                                        </li>
                                         ))}
                                </ul> 
                            ) : null}
                            <div className="flex space-x-1 pt-2">
                                {student.tags.map(tag => 
                                <div className="inline-block w-auto bg-gray-200 text-center text-gray-500 border-1 border-gray-200 rounded p-2"
                                key={student.id + " " + tag}
                                >
                                  {tag}
                                </div>)
                                }
                            </div>
                                <input className="text-gray-500 pt-5 pb-1 mb-4 appearance-none no-x-search leading-tight outline-none focus:border-gray-500 border-b border-gray-300"
                                    placeholder="Add a tag"
                                    onChange={(event) => {
                                        setNewTagName(event.target.value);
                                      }}
                                      onKeyUp={(event) => {
                                        if (event.key === "Enter") {
                                            function saveTag() {
                                                makeTagForStudent(student, newTagName);
                                              }
                                          saveTag();
                                          event.target.value = "";
                                        }
                                      }}
                                    spellCheck="false"
                                    type="text"
                                /> 
                        </div> 
                        <button
                          className="font-medium text-gray-400 text-7xl absolute top-px right-4"
								          onClick={() => handleToggle(student.id)}
							          >
								          {clicked.includes(student.id) ? "-" : "+"}
						            </button>
                      </div>
                       
                    </li>
                    ))}
                    </div>
                </div>
        </>
      );
    }
  

  


