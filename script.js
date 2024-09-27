function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  pom.style.display = 'none';
  document.body.appendChild(pom);

  pom.click();
  document.body.removeChild(pom);
}

function saveChecklist() {
  const form = document.getElementById('dse-form');
  let checklistData = '';

  // Collect the data from the form
  const sections = form.querySelectorAll('.section');

  sections.forEach(section => {
      const title = section.querySelector('h3').innerText;
      checklistData += `${title}\n`;

      // Collect responses
      const labels = section.querySelectorAll('label');
      labels.forEach(label => {
          const question = label.innerText;
          const checkedInput = label.querySelector('input[type="radio"]:checked');

          if (checkedInput) {
              const answer = checkedInput.value;
              checklistData += `${question} ${answer}\n`;
          } else {
              checklistData += `${question} No response\n`; // If no option is selected
          }
      });
      checklistData += '\n'; // Add a newline between sections
  });

  // Trigger download
  download('DSE_Workstation_Checklist.txt', checklistData);
}