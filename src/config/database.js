require("dotenv").config({
  path: process.env.NODE_ENV == 'test' ? ".env.test" : ".env"
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: "./__tests__/database.sqlite",
  port: '6543',
  operatorsAliases: 0,
  logging: false,
  define: {
    timestamps: true, // toda tabela cria automaticamente os campos createdAt e updatedAt
    underscored: true, // converter camelcase para snakecase (e.g UserGroups para user_groups)
    underscoredAll: true // aplica a mesma configuração da linha anterior mas para os fields também
  }
}