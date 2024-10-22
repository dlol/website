const wallpapers = [
    {
        "src": "/papes/colosseo.webp",
        "meta": {
            "location": {
                "en-GB": "Colosseum - Rome, Italy",
                "pt-BR": "Coliseu - Roma, Itália",
                "fr-BE": "Colisée - Rome, Italie"
            },
            "date": "2020-01-27T16:12:00.000+01:00"
        }
    },
    {
        "src": "/papes/vatican.webp",
        "meta": {
            "location": {
                "en-GB": "Vatican City",
                "pt-BR": "Cidade do Vaticano",
                "fr-BE": "Cité du Vatican"
            },
            "date": "2020-01-28T12:31:00.000+01:00"
        }
    },
    {
        "src": "/papes/lauterbrunnen.webp",
        "meta": {
            "location": {
                "en-GB": "Lauterbrunnen, Bern, Switzerland",
                "pt-BR": "Lauterbrunnen, Bern, Suíça",
                "fr-BE": "Lauterbrunnen, Bern, Suisse"
            },
            "date": "2020-08-07T13:11:00.000+02:00"
        }
    },
    {
        "src": "/papes/feldkirch.webp",
        "meta": {
            "location": {
                "en-GB": "Feldkirch, Vorarlberg, Austria",
                "pt-BR": "Feldkirch, Vorarlberg, Áustria",
                "fr-BE": "Feldkirch, Vorarlberg, Autriche"
            },
            "date": "2020-08-08T18:21:00.000+02:00"
        }
    },
    {
        "src": "/papes/bilten.webp",
        "meta": {
            "location": {
                "en-GB": "Bilten, Glarus, Switzerland",
                "pt-BR": "Bilten, Glarus, Suíça",
                "fr-BE": "Bilten, Glarus, Suisse"
            },
            "date": "2020-08-08T21:35:00.000+02:00"
        }
    },
    {
       "src": "/papes/lux.webp",
       "meta": {
            "location": {
                "en-GB": "Luxembourg",
                "pt-BR": "Luxemburgo",
                "fr-BE": "Grand-Duché de Luxembourg"
            },
            "date": "2021-08-04T20:21:00.000+02:00"
       }
    },
    {
        "src": "/papes/santorin.webp",
        "meta": {
             "location": {
                "en-GB": "Oía, Santorini, Greece",
                "pt-BR": "Oía, Santorini, Grécia",
                "fr-BE": "Oía, Santorin, Grèce"
            },
            "date": "2022-08-25T19:36:00.000+03:00"
        }
    },
    {
        "src": "/papes/london.webp",
        "meta": {
            "location": {
                "en-GB": "London, United Kingdom",
                "pt-BR": "Londres, Reino Unido",
                "fr-BE": "Londres, Royaume Uni"
            },
            "date": "2023-08-19T17:59:00.000+01:00"
        }
    },
    {
        "src": "/papes/han-sur-lesse.webp",
        "meta": {
            "location": {
                "en-GB": "Han-sur-Lesse, Belgium",
                "pt-BR": "Han-sur-Lesse, Bélgica",
                "fr-BE": "Han-sur-Lesse, Belgique"
            },
            "date": "2023-10-01T17:17:00.000+02:00"
        }
    },
    {
        "src": "/papes/breendonk.webp",
        "meta": {
            "location": {
                "en-GB": "Fort Breendonk, Belgium",
                "pt-BR": "Forte de Breendonk, Bélgica",
                "fr-BE": "Fort de Breendonk, Belgique"
            },
            "date": "2024-01-30T09:38:00.000+01:00"
        }
    },
    {
        "src": "/papes/brasil-2.webp",
        "meta": {
            "location": {
                "en-GB": "Inhapim, Minas Gerais, Brazil",
                "pt-BR": "Inhapim, Minas Gerais, Brasil",
                "fr-BE": "Inhapim, Minas Gerais, Brésil"
            },
            "date": "2024-07-21T15:48:00.000-03:00"
        }
    },
    {
        "src": "/papes/brasil.webp",
        "meta": {
            "location": {
                "en-GB": "Inhapim, Minas Gerais, Brazil",
                "pt-BR": "Inhapim, Minas Gerais, Brasil",
                "fr-BE": "Inhapim, Minas Gerais, Brésil"
            },
            "date": "2024-08-09T13:45:00.000-03:00"
        }
    }
]

let currentIndex = Math.floor(Math.random() * wallpapers.length)

const bg1 = document.getElementById('wallpaper1')
const bg2 = document.getElementById('wallpaper2')

let intervalId

function setWallpaper(index) {
    const currentBg = bg1.classList.contains('active') ? bg1 : bg2
    const nextBg = currentBg === bg1 ? bg2 : bg1

    nextBg.style.backgroundImage = `url(${wallpapers[index].src})`

    nextBg.classList.add('active')
    currentBg.classList.remove('active')

    const lang = document.documentElement.getAttribute("lang") || "en-GB"

    document.getElementById('location').innerHTML = wallpapers[index].meta.location[lang]

    const date = new Date(wallpapers[index].meta.date)
    const localeDate = date.toLocaleDateString(lang, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
    const localeTime = date.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })

    document.getElementById('time').innerHTML = `${localeDate} ${localeTime}`
}

function prevWallpaper() {
    currentIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length
    setWallpaper(currentIndex)
    resetInterval()
}

function nextWallpaper() {
    currentIndex = (currentIndex + 1) % wallpapers.length
    setWallpaper(currentIndex)
    resetInterval()
}

function resetInterval() {
    clearInterval(intervalId)
    intervalId = setInterval(nextWallpaper, 10000)
}

setWallpaper(currentIndex)

resetInterval()
