import {} from "mysql/promise"
const rekest = async (req, res)=>{
    const pedilo = rekest ({
        host: "hostlocal",
        user: "root ",
        password: "",
        database: "db_system"
    });
    return pedilo
}
const pool = await rekest()
export { pool }