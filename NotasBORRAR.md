1. Pasar de async away a promesas 
2. Agregar la ruta de Delete o put 
3. Cread nuevo componente de react en Nueva ruta 
4. Crear filtro 
5. Que es el thunk y como funciona 
6. como se conecta el back con el front 
7. Paginado con next y previous 
8. Agregar nuevo dato para renderizar en las cartas del home 
9. Crear filtro nuevo con dato diferente 
10. Explicar ciclo/recorrido del post/get 
PREGUNTAS PARA PRACTICAR PI 
- Como controlo un formulario? con los Estados 
- Pasar de async await a promesas.  
- Componentes de clase a funcional.  
- Que funciones cada filtro/ordenamiento y que agarre datos de la api y db, que la creacion funcion y que todo ande bien 
- Mostrar todo el codigo explicando que hacia en general cada cosa de back y front 
- Cambiar el search de nombre a que busque por genero/otra propiedad  
- Cambiar el filtro del front al back 
- Que es el thunk de redux 
De que otra forma podrías relacionar las dos tablas?  
- que son las primary key y las foreign key?  
- porque una image lleva dataype text? 
Mauro: A mi me tocó Matias Cavallo, me hizo que le muestra toda la pagina, despues que modifique en el filtrado algo que tenia mal, que me filtre por created o api y sobre eso mismo filtrar por generos. Me preguntó sobre como funciona el dispatch y thunk, tipos de actions, cambiar de async await a promesas una action. En el back me hizo hacer una ruta para crear un genero de videojuego que llega por body del front. Y me preguntó si tenia testing hecho. 
pinta un mate paaa? 🧉 — 23/06/2022 
POR PROMISE 
        return function(dispatch) { 
        axios.get("http://localhost:3001/pokemons/%22+id) 
        .then(res =>{ 
            dispatch({ 
                type: 'GET_DETAILS', 
              payload: res.data 
            }) 
        }) 
 
 
 
- hacer un ordenamiento extra 
- thunk middleware 
- lo mejor es q la lógica esté en el reducer y no en las actions (para Dani estas 3) 
- cambiar el form para cuando seleccionas un pais de nuevo lo saque del array 
- pasar async/await a promesas 
- cambiar ruta del detail para q reciba query y no params 
- cambiar el paginado 
-validaciones del form 
- pasar a fetch 
- mostrar wl flujo desde el back al front 
- cambiar la ruta, en vez de traer por params q sea por query 
FILTRO PARA TRAER DE DB: 
 
1)PONER FLAG EN DB 
2)MAPEARLO EN LAS RUTAS DEL BACK DONDE ELIJO LA INFO PARA TRAER 
 
 
3)HOME: 
 
a) hago el select  
<select 
          defaultValue="all" 
          onChange={(e) => handleFilterDb(e)} 
          > 
            <option value = "all">All</option> 
            <option value = "api">Api</option> 
            <option value = "created">DataBase</option> 
          </select> 
 
b) hago el handler 
 
 function handleFilterDb(e){ 
    e.preventDefault(); 
    dispatch(fiterByDb(e.target.value)) 
    setCurrentPage(1); 
 
  } 
 
c) importo la action 
 
4) VOY A LAS ACTIONS --> LA CREO: 
 
export function fiterByDb(payload){ 
  return { 
    type: "FILTER_BY_DB", 
    payload 
  } 
} 
 
5) VOY AL REDUCER A CREAR EL CASO: 
 
case "FILTER_BY_DB": 
        const allRecipes2 = state.allRecipes; 
        const recipesFiltered =  
        action.payload === "created"  
        ? allRecipes2.filter(e => e.createdInDb) 
        : allRecipes2.filter(e => !e.createdInDb) 
        return{ 
          ...state, 
          recipes: action.payload === "all" ? allRecipes2 : recipesFiltered 
        } 
BACKEND 
BASE DE DATOS: 
1)    Creación de base de datos en PGAdmin 
2)    Creación de las tablas que va a clasificar la información de la base de datos. (MODELS) 
3)    Agrego las ENTIDADES de la base de datos 
4)    Genero las relaciones entre tablas en db.js 
RUTAS: 
1)    Creo mis funciones controladoras que luego invocaré en las rutas 
a)    Función para traer las dietas de la API   filtro lo que necesito 
b)    Función para traer las dietas de la DB  filtro lo que necesito 
c)    Función para unir todas las recetas. 
2)    Creo mis rutas: 
a)    Ruta Get  traigo todas las recetas y si hay name filtro y solo devuelvo esas. 
b)    Ruta Get Diets  traigo todas las dietas

> Lucas Andrada:
de la api y les hago un find or créate para que estén precargadas en mi base de datos. 
c)    Ruta Post  me entra toda la información por body. Hago un créate de receta con los elementos que voy a utilizar para crearla y me traigo del modelo Diets de base de datos aquellas que coincidan con el nombre que necesito. (ahí hago la relación entre las tablas) 
d)    Ruta Get:id es una ruta dinámica por lo que el id llega por params. Primero ejecuto la función controladora que trae todas las recetas, luego pegunto si hay id. Si hay, el hago un filter para que me devuelva solo esa receta 
 
 
 
 
EL COMPONENTE DESPACHA LA ACTION, QUE SE EJECUTA EN EL REDUCER Y MODIFICA EL ESTADO GLOBAL QUE ES EL ESTADO DEL STORE. 
FRONTEND 
1)    Instalo las dependencias. Redux-dev-tools, Redux-thunk, React-router-dom, redux, react-redux, axios 
2)    Creacion de las carpetas en BoilerPlate 
a)    Store  
Creo mi store y le paso como middleware Thunk, que se importa de readux-thunk 
i)    Luego voy a mi index.js envuelvo mi archivo raíz en un Provider, al cual le paso el store. Esto es para que readux me de pelota. 
ii)    Luego voy a mi app.js y envuelvo todo en el BrowserRouter.  
iii)    Acá es donde voy a renderizar mis rutas 
 
b)    Components  me pueden pedir que los haga de clase 
i)     Creo las carpetas de los componentes, las cuales van a contener un archivo jsx del componente y un archivo de css del componente 
ii)    Importo react y link si lo utilizo 
iii)    Exporto la función, por ejemplo LandingPage() que solo retorna un div con información.  ahora voy a las actions 
 
c)    Actions   me pueden pedir que cambie a promesas con fetch 
Punto de unión entre el back y el front 
i)    Importo axios porque van a hacer llamadas asíncronas 
ii)    Export getRecipes() por ejemplo y hago la lógica 
iii)    Va a tener un Type y un Payload. 
 
d)    Reducer 
i)    Creo un estado inicial de las cosas que voy a necesitar 
ii)    Voy a tener una función raíz la cual va a recibir  un estado que va a ser el estado inicial y voy a hacer un switch pasándole el type, que según eso vaya entrando en cada caso. 
iii)    Creo el primer case “GET_RECIPES”: return {…state, algo mas} 
 
 
 
 
 
 
Explicacion componentes: 
1)    LANDINGPAGE: 
•    Es un archivo jsx donde importo React de React, Link de react-router-dom 
•    Exporto la función de landingPage() que va a retornar un div con el titulo y un botón con un link dirigido a la ruta /home 
2)    HOME: 
i)    Importaciones: 
•    Importo de react  FRAGMENT, USESTATE, USEEFFECT 
•    Importo las actions que voy a utilizar 
•    Importo el componente dumb o presentacional que voy a mostar 
•    Importo el archivo de css 
 
ii)    Componente Funcional   Smart Component 
•    Ejecuto en una constante el usDispatch para despachar la acción 
•    Genero un estado local para ir modificando  useSelector((state) => state.recipes) 
•    PAGINADO 
•    Hago un useEffect para despachar siempre la acción de traerme las recetas 
•    --- funciones handleOrder / filter o lo que sea que necesite crear --- 
•    Retorno lo que renderizo 
i)    NavBar  renderizo el componente ya creado 
ii)    Renderizo los filtros que voy creando, los cuales son un SELECT, que escuchan un ONCHANGE  ejecutan un handleOrderByName(e) que despacha la función de orderByName pasándole el value del target como parámetro, el cual será utilizado en la action como el payload. Y seteo el resultado en la página 1 
iii)    Renderizo el filtro faltante con la misma lógica 
iv)    Renderizo las cards que son componentes Dumb, donde pregunto si hay algo en la variable de declare con los datos del estado que me traje y renderizo las cards, en caso que no haya, mando un msj que no existe la receta.