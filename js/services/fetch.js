import { API_URL } from "../constants.js"

export const getDepartments = async () => {
    const resp = await fetch(`${API_URL}/Department`)
    const json = resp.json()
    return json
}

export const getCities = async ({ departmentId }) => {
    const resp = await fetch(`${API_URL}/Department/${departmentId}/cities`)
    const json = resp.json()
    return json
}

export const getDepartmentData = async ({ departmentId }) => {
    const resp = await fetch(`${API_URL}/Department/${departmentId}`)
    const json = resp.json()
    return json
}

export const getCityData = async ({ cityId }) => {
    const resp = await fetch(`${API_URL}/City/${cityId}`)
    const json = resp.json()
    return json
}