

export async function add_member(base, data) {
    return fetch(base + 'member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
}

export async function get_members(base) {
    return fetch(base + 'members/public')
}

export async function get_members_counter(base) {
    return fetch(base + 'members/count')
}
