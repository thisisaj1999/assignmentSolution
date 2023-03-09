/*
2. Create a function getResultOfClass that accepts a string parameter and returns list of students along with their rank in class. Rank is again based on total marks obtainedTotal marks calculation criteria is discussed in first task.You can add more students in json if needed and format the data in following format

John Doe obtained x marks [English() <Pass/Fail>, Maths(), Physics(), Chemistry()] got 1st Position

Bob Doe obtained x marks [English() <Pass/Fail>, Maths(), Physics(), Chemistry()] got 2rd Position

Jane Doe obtained x marks [English() <Pass/Fail>, Maths(), Physics(), Chemistry()] got 3rd Position
*/

const studentsObj = require('./students.json');

const getResultOfClass = (sectionName) => {
  // Maximum Marks
  const minMarks = 50 * (33 / 100);

  let studentsArr;

  const classArr = studentsObj.reduce((acc, cv) => {
    const studentClass = cv.class;

    if (studentClass === sectionName) {
      let studentName = `${cv.name.first} ${cv.name.last}`;

      let totalMarks = 0;
      const arr = cv.marks.filter((items) => {
        totalMarks =
          items.marks >= minMarks ? totalMarks + items.marks : totalMarks;
        return totalMarks;
      });

      let allMarks = cv.marks.map((items) => {
        return items.marks;
      });

      let position = allMarks.map((items) => {
        return items >= minMarks ? 'Pass' : 'Fail';
      });

      acc[
        `${studentName} obtained ${totalMarks} marks [English(${allMarks[0]})<${position[0]}>, Maths(${allMarks[1]})<${position[1]}>, Physics(${allMarks[2]})<${position[2]}>, Chemistry(${allMarks[3]})<${position[3]}>] got`
      ] = totalMarks;
    }
    return acc;
  }, {});

  //   console.log(classArr);

  const pos = ['1st', '2nd', '3rd'];

  const sortedMarks = Object.keys(classArr)
    .sort((a, b) => classArr[b] - classArr[a])
    .reduce(
      (obj, key, i) => ({
        ...obj,
        [`${key} ${pos[i]} position`]: classArr[key],
      }),
      {}
    );

  return Object.keys(sortedMarks);
};

console.log(getResultOfClass('tenth-a'));
