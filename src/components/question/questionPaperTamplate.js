function questionTemp(heading, subheading, questions) {
  let questionHTML = "";
  const data = questions;
  // Iterate through each question object
  data.forEach((question, index) => {
    const { question: questionContent, options, answer } = question;

    // Generate the options list dynamically
    const optionsList = options
      .map((option, idx) => {
        return `<li class="mb-2">
                  <span class="font-semibold">${String.fromCharCode(
                    65 + idx
                  )}. ${option}</span>
                </li>`;
      })
      .join("");

    // Generate HTML for each question
    questionHTML += `
        <div class="max-w-full mx-auto bg-white p-2 rounded  mb-2">
          <div class="mb-2">
            <p class="mb-4">Question ${index + 1} <span>${questionContent}</span></p>
          </div>
  
          <div class="mb-2">
            <h3 class="text-sm font-bold mb-2">Options</h3>
            <ul>
              ${optionsList}
            </ul>
          </div>
  
          <div class="mb-4">
            <h3 class="text-sm font-bold mb-2">Correct Answer</h3>
            <p class="mb-4">
              The correct answer is: <span class="font-semibold">${answer}</span>
            </p>
          </div>
        </div>
      `;
  });

  // Complete HTML template
  const template = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Multiple Choice Questions</title>
      <!-- Include Tailwind CSS -->
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
     <h2 class="text-lg text-center font-bold mb-2">${heading}</h2>
          <p class="text-sm text-center text-gray-600 mb-4">${subheading}</p>
    ${questionHTML}
  </body>
  </html>`;

  return template;
}

export default questionTemp;
