function setBackground(questionType) {
  let background = "";
  switch (questionType) {
    case "peikeleik":
      background = "blue";
      break;
    case "ryggMotRygg":
      background = "red";
      break;
    case "jegHarAldri":
      background = "green";
      break;
    default:
      background = "purple";
      break;
  }

  return background;
}

export default setBackground;
