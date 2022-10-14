let url = 'http://localhost:3001/tasks'
let for_tables = document.querySelector('.for_tables')
let wrap = document.querySelector('.wrap')
let show_table = document.querySelector('.show_table')
let show_plate = document.querySelector('.show_plate')
let main_header = document.querySelector('.main_header')
let form = document.forms.login
let save = document.querySelector('.save')
let modal_bg = document.querySelector('.modal_bg')
let modal = document.querySelector('.modal')
let header_create = document.querySelector('.header_create')
let main_input = document.querySelectorAll('.main_input')
let header_search = document.querySelector('.header_search')
let del = document.querySelector('.del')

const fetchUsers = () => {
    axios.get(url)
        .then(res => reload(res.data))
}
fetchUsers()


const reload = (arr) => {
    for_tables.innerHTML = ""
    wrap.innerHTML = ""

    // header_search.onkeyup = () => {
    //     let value = header_search.value.toLowerCase().trim()

    //     let filtered = arr.filter(item => {
    //         if (item.title.toLowerCase() === header_search.value    ) {
    //             return item
    //         }
    //     })
    //     console.log('l');
    //     reload(filtered)

    //     }

    for (let item of arr) {

        // show_table

        let main_table = document.createElement('div')
        let main_title_text = document.createElement('div')
        let main_description_text = document.createElement('div')
        let main_date_text = document.createElement('div')
        let main_time_text = document.createElement('div')
        let main_is_done_text = document.createElement('div')

        main_table.classList.add('main_table')
        main_title_text.classList.add('main_title_text')
        main_title_text.innerHTML = `${item.title}`
        main_description_text.classList.add('main_description_text')
        main_description_text.innerHTML = `${item.info}`
        main_date_text.classList.add('main_date_text')
        main_date_text.innerHTML = `${item.data}`
        main_time_text.classList.add('main_time_text')
        main_time_text.innerHTML = `${item.time}`
        main_is_done_text.classList.add('main_is_done_text')
        main_is_done_text.innerHTML = `${item.ready}`

        for_tables.append(main_table)
        main_table.append(main_title_text, main_description_text, main_date_text, main_time_text, main_is_done_text)

        if (item.ready === 'Готово') {
            main_is_done_text.style.color = '#000'
        } else if (item.ready === 'В прогрессе') {
            main_is_done_text.style.color = '#007FFF'
        }

        // show_table

        // show_plate

        let main_plate = document.createElement('div')
        let main_plate_title = document.createElement('div')
        let main_plate_description = document.createElement('div')
        let main_plate_time = document.createElement('div')

        let main_plate_time_date = document.createElement('div')
        let main_plate_time_hour = document.createElement('div')

        let main_plate_is_done = document.createElement('div')

        main_plate.classList.add('main_plate')
        main_plate_title.classList.add('main_plate_title')
        main_plate_title.innerHTML = `${item.title}`
        main_plate_description.classList.add('main_plate_description')
        main_plate_description.innerHTML = `${item.info}`
        main_plate_time.classList.add('main_plate_time')

        main_plate_time_date.classList.add('main_plate_time_date')
        main_plate_time_date.innerHTML = `${item.data}`
        main_plate_time_hour.classList.add('main_plate_time_hour')
        main_plate_time_hour.innerHTML = `${item.time}`

        main_plate_is_done.classList.add('main_plate_is_done')
        main_plate_is_done.innerHTML = `${item.ready}`

        wrap.append(main_plate)
        main_plate.append(main_plate_title, main_plate_description, main_plate_time, main_plate_is_done)
        main_plate_time.append(main_plate_time_date, main_plate_time_hour)

        if (item.ready === 'Готово') {
            main_plate_is_done.style.color = '#000'
        } else if (item.ready === 'В прогрессе') {
            main_plate_is_done.style.color = '#007FFF'
        }

        // change buttons

        show_table.onclick = () => {
            for_tables.style.display = "block"
            show_plate.style.color = '#979797'
            show_table.style.color = '#007FFF'
            wrap.style.display = "none"
            main_plate.style.display = "none"
            main_header.style.display = "flex"
        }

        show_plate.onclick = () => {
            for_tables.style.display = "none"
            show_plate.style.color = '#007FFF'
            show_table.style.color = '#979797'
            wrap.style.display = "flex"
            main_plate.style.display = "block"
            main_header.style.display = "none"

        }
    }

}


// posting

const postTask = (data) => {
    axios.post(url, data)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                fetchUsers()
            }
        })
}

form.onsubmit = (e) => {
    e.preventDefault()

    let task = {
        id: Math.random(),
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    postTask(task)

}

// open and close

header_create.onclick = () => {
    openModal()
}
save.onclick = () => {
    closeModal()
}

modal_bg.onclick = () => {
    closeModal()
}

const openModal = () => {
    modal.style.display = "block"
    modal.style.opacity = "1"
    modal_bg.style.display = "block"
    modal_bg.style.opacity = "1"
}
const closeModal = () => {
    modal.style.display = "none"
    modal.style.opacity = "0"
    modal_bg.style.display = "none"
    modal_bg.style.opacity = "0"
}