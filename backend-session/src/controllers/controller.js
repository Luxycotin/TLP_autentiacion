import { conn } from "../../db/database.js";

export const session = (req, res) => {
    console.log(req.session)
    if (req.session. userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay una sesión activa actualemnte' });
    }
};

export const logout = (req, res) => {
    console.log(req.session)
    conn.query
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
};

export const register = async (req, res)=>{
    const { username, password} = req.body;
    try {
        const [result] = await conn.execute(
          "INSERT INTO users(username, password) VALUES (?,?)",
          [username, password]
        );
    
        console.log(result);
        //el insertId, sale de lo que te muestra por consola el result. Es una parte de lo que esta compuesto el result
        const [userFind] = await conn.execute("SELECT * FROM users WHERE id = ?", [
          result.insertId,
        ]);
    
        res.status(201).json(userFind[0]); //el [0] es para encontrar el primer resultado y tambien para que no devuelva un array sino un objeto (en el thunderclient se ve mejor).
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Error con la Base de Datos en POST",
        });
      }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario
    const [[user]] = await conn.query("SELECT * FROM users WHERE username = ? and password = ?",[username,password]);
    if (user) {
        // Guardar información del usuario en la sesión
        req.session.userId = user.id;
    req.session.username = user.username;

        return res.json({ 
            message: 'Se ha concretado el inisio de sesión', 
            user: { id: user.id, username: user.username } });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};