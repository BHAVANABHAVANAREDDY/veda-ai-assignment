const generateQuestions = async (data) => {
  return `
SECTION A - Multiple Choice Questions

1. What is the powerhouse of the cell?
Difficulty: Easy
Marks: 2

2. Which organelle contains DNA?
Difficulty: Medium
Marks: 2

3. What is photosynthesis?
Difficulty: Easy
Marks: 2

4. Define osmosis.
Difficulty: Medium
Marks: 2

5. Which cell organelle produces proteins?
Difficulty: Hard
Marks: 2

SECTION B - Short Answer Questions

6. Explain cell membrane structure.
Difficulty: Medium
Marks: 10

7. Describe mitochondria function.
Difficulty: Medium
Marks: 10

SECTION C - Long Answer Questions

8. Explain photosynthesis in detail.
Difficulty: Hard
Marks: 20

9. Describe plant vs animal cells.
Difficulty: Hard
Marks: 20

10. Explain DNA replication.
Difficulty: Hard
Marks: 30
`;
};

module.exports = generateQuestions;