export const prompts = {
  getLocationCities: (city) =>
    `No quiero que me digas nada más, no escribas nada que no sea la latitud y longitud sin unidades de ${city} y ponlo en un arreglo. Ejemplo: [longitud, latitud]`,

  getIsCountryOrCity: (city) =>
    `No quiero que me digas nada más, no escribas nada que no sea si ${city} es un país o una ciudad. Responde con "país" o "ciudad"`,

  getSuggestionsPlaces: (city) =>
    `No quiero que me digas nada más, no escribas nada que no sean los nombres en español de los lugares más turísticos, mínimo 10 lugares, que se encuentran en ${city} y pon solamente las coordenadas de longitud y latitud sin unidades de cada lugar dentro de un objeto, si los nombres tiene espacios sustituir por guiones bajos. Ejemplo: {"nombre_del_lugar": {"longitud": longitud, "latitud": latitud}}`,

  getStoryPlaces: (place) =>
    `Eres un guía de turistas y quiero que me cuentes los datos históricos de ${place}. No escribas nada más que la información histórica de ${place}. Dame la respuesta en formato html`,

  getItinerary: (
    city,
    places
  ) => `crea una ruta turística de ${city} tomando en cuenta solamente los siguientes lugares: ${places}, dividiendo por días las visitas y separa por etiquetas de párrafos de html cada uno de los días. Ejemplo: <html>
    <head>
    <title>Ruta turística por Madrid</title>
    </head>
    <body>

    <h1>Ruta turística por Madrid</h1>

    <h2>Día 1</h2>
    <p>
    Visita al <strong><span class="namePlace">Museo del Prado</span></strong> para disfrutar de una de las colecciones de arte más importantes del mundo. Después, paseo por el <strong><span class="namePlace">Parque del Retiro</span></strong> para relajarse y disfrutar de la naturaleza.
    </p>

    <h2>Día 2</h2>
    <p>
    Visita al <strong><span class="namePlace">Palacio Real</span></strong> para conocer la residencia oficial de los reyes de España. Continúa tu recorrido por la <strong><span class="namePlace">Plaza Mayor</span></strong> y la <strong><span class="namePlace">Puerta del Sol</span></strong>, dos de los lugares más emblemáticos de la ciudad.
    </p>

    <h2>Día 3</h2>
    <p>
    Visita al <strong><span class="namePlace">Estadio Santiago Bernabeu</span></strong> para conocer el hogar del Real Madrid. Continúa tu recorrido por el <strong><span class="namePlace">Templo de Debod</span></strong>, un regalo de Egipto a España, y termina el día paseando por la <strong><span class="namePlace">Gran Vía</span></strong>.
    </p>

    <h2>Día 4</h2>
    <p>
    Visita la <strong><span class="namePlace">Plaza de Cibeles</span></strong> y admira la fuente y el Palacio de Cibeles. Después, disfruta de la gastronomía española en el <strong><span class="namePlace">Mercado de San Miguel</span></strong>, donde podrás probar tapas y vinos.
    </p>

    <p>!Esperamos que disfrutes de tu visita a Madrid! 🥳</p>

    </body>
    </html>`,

    getValidateNameCity: (coordenadas) => `Escribe solamente el nombre de la ciudad a la que pertenecen las siguientes coordenadas: latitud:${coordenadas[1]} longitud:${coordenadas[0]}`
};
