/* 1. Find the Best 3 students 
To know who is best, add the marks for students.Only the marks that are more than 33% of maximum marks can be addedMaximum marks for this evaluation are to be set to 50
*/

const studentsObj = require('./students.json');

const minMarks = 50 * (33 / 100);

const totalMarks = studentsObj.reduce((acc, cv) => {
  let studentName = `${cv.name.first} ${cv.name.last}`;

  let sum = 0;
  cv.marks.filter((items) => {
    sum = items.marks >= minMarks ? sum + items.marks : sum;
    return sum;
  });
  acc[studentName] = sum;
  return acc;
}, {});

// doubt
const sortedMarks = Object.keys(totalMarks)
  .sort((a, b) => totalMarks[b] - totalMarks[a])
  .filter((val, i) => i < 3)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: totalMarks[key],
    }),
    {}
  );

console.log(sortedMarks);
