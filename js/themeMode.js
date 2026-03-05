let darkmode = localStorage.getItem('darkmode')

const themeButton = document.querySelector('.theme-switch')

const enableDarkMode = () => {
  document.body.classList.add('light-mode')
  localStorage.setItem('darkmode', "active")
  themeButton.textContent = "Dark"
}

const disableDarkMode = () => {
  document.body.classList.remove('light-mode')
  localStorage.setItem('darkmode', 'inactive')
  themeButton.textContent = "Light"
}

if (darkmode === "active") {
  enableDarkMode()
}

themeButton.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkMode() : disableDarkMode()
})
