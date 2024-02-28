const ResumeParser = require('./src');
const Resume = require('./src/utils/Resume');
const Routes = require('./FileUpload/uploads/Lishika_Goel_Resume-1.docx')

const fileDir = process.cwd() + '/FileUpload/uploads/';
ResumeParser
  .parseResumeFile(fileDir + Routes, fileDir + 'compiled') //input file, output dir
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log('parseResume failed');
    console.error(error);
  });

// ResumeParser.parseResumeUrl('http://www.mysite.com/resume.txt') // url
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.log('parseResume failed');
//     console.error(error);
//   });
