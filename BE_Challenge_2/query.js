exports.table = "create table if not exists course(id int primary key, name varchar(20), description varchar(200), image varchar(50), created date)"

exports.create = function (course) {
    return `insert into course(id, name, description, image, created) values(${course.id},'${course.name}', '${course.description}', '${course.image}', NOW())`
}

exports.update = function (course) {
    if (typeof course.id != 'number')
        throw 'id not valid'
    const params = []
    if (course.name)
        params.push(`name = '${course.name}'`)
    if (course.description)
        params.push(`description = '${course.description}'`)
    if (course.image)
        params.push(`image = '${course.image}'`)
    return `update course set ${params.join(' , ')} where id = ${course.id}`
}

exports.delete = function (id) {
    if (!Number.isInteger(Number(id)))
        throw 'id not valid'
    return `delete from course where id = ${id} and DATEDIFF(NOW(), created) <= 3`
}

exports.selectAll = "select * from course"

exports.select = function (pref) {
    return `select * from course where name like '${pref}%'`
}