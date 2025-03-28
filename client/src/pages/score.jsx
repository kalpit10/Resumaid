async function Score() {
  let suggestions = [];
  let positives = []; // New array to store positive messages
  let score = 0;

  try {
    const response = await fetch("http://localhost:5000/result");
    const data = await response.json();

    if (data.objective) {
      score += 10;
      positives.push("✔ Objective is included");
    } else {
      suggestions.push("Write an objective\n\n");
    }

    if (data.skills) {
      score += 10;
      positives.push("✔ Skills are well mentioned");
    } else {
      suggestions.push("Write some skills\n\n");
    }

    if (data.courses || data.certifications || data.certification || data.certificates) {
      score += 5;
      positives.push("✔ Certifications/Courses are included");
    } else {
      suggestions.push("Mention some courses or certifications\n\n");
    }

    if (data.projects) {
      score += 20;
      positives.push("✔ Projects are listed");
    } else {
      suggestions.push("Mention some projects\n\n");
    }

    if (data.experience || data.workexperience) {
      score += 30;
      positives.push("✔ Work experience is provided");
    } else {
      suggestions.push("Write some experiences\n\n");
    }

    if (
      data.interests ||
      data.achievements ||
      data.achievement ||
      data["co-curricular"] ||
      data.hobbies ||
      data.activities
    ) {
      score += 5;
      positives.push("✔ Interests/Co-curricular activities are included");
    } else {
      suggestions.push(
        "Write some interests/achievements/co-curricular/hobbies/activities\n\n"
      );
    }

    if (data.education || data.Education) {
      score += 5;
      positives.push("✔ Education details are mentioned");
    } else {
      suggestions.push("Mention your education background\n\n");
    }

    if (data.email) {
      score += 5;
      positives.push("✔ Email is included");
    } else {
      suggestions.push("Provide an e-mail \n\n");
    }

    if (data.profiles || data.profile) {
      score += 15;
      positives.push("✔ Profile links (e.g., LinkedIn) are added");
    } else {
      suggestions.push("Mention any profile (LinkedIn Recommended)\n\n");
    }

    score = Math.floor((score / 105) * 100); // Convert score to percentage

    return { score, positives, suggestions }; // Return both positives & suggestions
  } catch (error) {
    console.error(error);
    return { score: 0, positives: [], suggestions: ["Error fetching data"] };
  }
}

export default Score;
