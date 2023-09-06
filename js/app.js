import { getCities,getDepartmentData,getCityData,getDepartments } from "./services/fetch.js"

const departmentsSelect = document.getElementById("departments")
const citiesSelect = document.getElementById("cities")

const departmentTitle = document.getElementById("department-name")
const departmentParagraph = document.getElementById("department-summary")
const departmentFooter = document.getElementById("department-footer")

const cityTitle = document.getElementById("city-name")
const cityParagraph = document.getElementById("city-summary")
const cityFooter = document.getElementById("city-footer")

const loader = document.querySelector(".loader-container")

const placeholder = document.querySelector(".placeholder")

const setDepartmentsOptions = async () => {
    const departments = await getDepartments()
    const departmentsOptions = document.createDocumentFragment()
    await departments.forEach(({ id, name }) => {
        const option = document.createElement("option")
        option.value = id
        option.textContent = name
        departmentsOptions.append(option)
    })
    departmentsSelect.append(departmentsOptions)
}

setDepartmentsOptions()

departmentsSelect.addEventListener("change", async (event) => {
    try {
        citiesSelect.innerHTML = "<option hidden selected>Seleccione una ciudad</option>"
        cityTitle.textContent = ''
        cityParagraph.textContent = ''
        cityFooter.innerHTML = ''
        placeholder.remove()

        loader.classList.add("loading")

        const departmentId = event.target.value
        const { name, description, population, cityCapital } = await getDepartmentData({ departmentId })
        const cities = await getCities({ departmentId })

        departmentTitle.textContent = name
        departmentParagraph.textContent = description
        const departmentPopulationSpan = population ? `<span><b>Poblacion:</b> ${population}</span>` : ""
        const departmentCapitalSpan = cityCapital ? `<span><b>Capital:</b> ${cityCapital.name}</span>` : ""

        departmentFooter.innerHTML = departmentCapitalSpan + departmentPopulationSpan

        const citiesOptions = document.createDocumentFragment()
        await cities.forEach(({ id, name }) => {
            const option = document.createElement("option")
            option.value = id
            option.textContent = name
            citiesOptions.append(option)
        })
        citiesSelect.append(citiesOptions)
    } catch (error) {
        departmentTitle.textContent = 'Ha ocurrido un error'
        departmentParagraph.textContent = ''
        departmentFooter.textContent = ''
    } finally {
        loader.classList.remove("loading")
    }

})

citiesSelect.addEventListener("change", async (event) => {
    try {
        loader.classList.add("loading")
        const cityId = event.target.value
        const cityData = await getCityData({ cityId })
        const { name, description, surface, population } = cityData
        cityTitle.textContent = name
        cityParagraph.textContent = description ? description : 'Esta ciudad no tiene descripcion'

        const departmentPopulationSpan = population ? `<span><b>Poblacion:</b> ${population}</span>` : ""
        const departmentCapitalSpan = surface ? `<span><b>Superficie:</b> ${surface}</span>` : ""

        cityFooter.innerHTML = departmentCapitalSpan + departmentPopulationSpan
    } catch (error) {
        cityTitle.textContent = 'Ha ocurrido un error'
        cityParagraph.textContent = ''
        cityFooter.textContent = ''
    } finally {
        loader.classList.remove("loading")
    }

})

