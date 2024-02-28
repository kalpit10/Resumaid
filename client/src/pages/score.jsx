import swal from "sweetalert";

async function Score() {
  let suggestions = [];
  let score = 0;

  try {
    const response = await fetch("http://localhost:5000/result");
    // const response = await fetch("https://resumaid.herokuapp.com/result");
    const data = await response.json();

    if (data.objective) {
      score = score + 10;
    } else {
      var sug1 = "\n   Write an objective\n\n";
      suggestions.push(sug1);
    }

    if (data.skills) {
      score = score + 10;
    } else {
      var sug2 = "  Write some skills\n\n";
      suggestions.push(sug2);
    }
    if (data.courses || data.certifications || data.certification) {
      score = score + 5;
    } else {
      var sug3 = "  Mention some courses or certifications\n\n";
      suggestions.push(sug3);
    }
    if (data.projects) {
      score = score + 20;
    } else {
      var sug4 = " Mention some projects\n\n";
      suggestions.push(sug4);
    }
    if (data.experience || data.workexperience) {
      score = score + 30;
    } else {
      var sug5 = "  Write some experiences\n\n";
      suggestions.push(sug5);
    }
    if (data.cocurricular || data.hobbies) {
      score = score + 5;
    } else {
      var sug6 = "  Mention some co-curricular activities\n\n";
      suggestions.push(sug6);
    }
    if (data.interests || data.achievements || data.achievement) {
      score = score + 5;
    } else {
      var sug7 = "  Write some interests and achievements\n\n";
      suggestions.push(sug7);
    }

    if (data.education) {
      score += 5;
    } else {
      var sug8 =
        "Mention your education background if work experience is less than 2 years \n\n";
      suggestions.push(sug8);
    }

    if (data.email) {
      score = score + 5;
    } else {
      var sug9 = "Provide an e-mail \n\n";
      suggestions.push(sug9);
    }

    if (data.profiles || data.profile) {
      score = score + 10;
    } else {
      var sug10 = "Mention any profile(LinkedIn Recommended)\n\n";
      suggestions.push(sug10);
    }

    score = Math.floor((score / 105) * 100);
    let removeComma = () => {
      swal({
        title: "Your score is " + score + "%",
        icon: "success",
        buttons: {
          cancel: "Go back",
          catch: {
            text: "Suggestions",
            value: "catch",
          },
        },
      }).then((value) => {
        switch (value) {
          case "catch":
            swal({
              title: "Here are some suggestions to improve your resume:",
              text: suggestions.join(" "),
            });
            break;

          default:
            swal("Thank you for using Resumaid!");
        }
      });
    };
    removeComma();
  } catch (error) {
    console.error(error);
  }
}

export default Score;
