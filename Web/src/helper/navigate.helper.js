export const navigateOptions = [
    {
        role: 1,
        navigation: '/admin'
    },
    {
        role: 2,
        navigation: '/dean'
    },
    {
        role: 3,
        navigation: '/doctor'
    },
    {
        role: 4,
        navigation: '/nurse'
    },
    {
        role: 5,
        navigation: '/coordinator'
    },
    {
        role: 6,
        navigation: '/patient'
    },
]

export const checkNavigation = (role) => {
    const value = navigateOptions.find(item => item.role === role);
    return value.navigation
}

export const checkProfile = (profile) => {
    if (profile.role) {
        return profile.role
    }
    else return 6;
}