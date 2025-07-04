

function getRandomPic() {

    const imgs = ["https://m.media-amazon.com/images/I/41GkW22CFyL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51Uz5yp0X+L._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41C-yjGORPL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41neA+YVSKL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41SxRGlbtpL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51bqHIXJjUL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41-VXH8yslL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51Cv3tcfExL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41VG-S87naL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51tJkBXXXgL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41dL07fEBZL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41Eo9zQiD0L._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51ct6FwwNFL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51rfBY-E7fL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/B1RUiGGrf3L._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51h9T2BHHeL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51JCj+wlbIL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/5101ahXPFhL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41mfZrEK8vL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41-m4pAnaaL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51Z0uKYRjRL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41itwgyVnDL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/41bTfDXip-L._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51BilFsX8hL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51mcDhio4qL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51x091eli7L._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/511qqrP7yxL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51Y8BNkUDDL._UX300undefined_.jpg",
        "https://m.media-amazon.com/images/I/51gA3BQp+TL._UX300undefined_.jpg",
    ]

    const randIdx = getRandomInt(0, imgs.length)
    const currUrl = imgs[randIdx]

    return currUrl

}