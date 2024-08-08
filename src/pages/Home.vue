<template>
  <div class="container mx-auto py-8 px-4">
    <div class="relative w-full max-w-4xl mx-auto mt-8">
      <!-- Carousel Wrapper -->
      <div class="relative overflow-hidden rounded-lg shadow-lg h-72 md:h-96">
        <!-- Slides -->
        <div class="carousel flex transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <!-- Slide 1: Image -->
          <div class="carousel-item w-full h-72 md:h-96">
            <img src="/public/logo_tipografia_mobile.png" alt="San Semillero Banner" class="w-full h-full object-none">
          </div>
          <!-- Slide 2: Image with Text -->
          <div class="carousel-item w-full h-72 md:h-96 relative">
            <div class="absolute inset-0 bg-cover bg-center opacity-50">
              <img src="/public/banner2.png" alt="banner san semillero" class="w-full h-full object-none">
            </div>
            <div class="relative z-10 flex items-center justify-center h-full p-6 bg-black bg-opacity-50">
              <div class="text-center text-white">
                <h1 class="text-lg md:text-4xl font-bold mb-4">San Semillero</h1>
                <p class="text-sm md:text-lg">Donde los futuros cracks de San Lorenzo nacen y crecen. ¡Aquí, el talento juvenil se transforma en leyendas azulgranas!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100">
        ‹
      </button>
      <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100">
        ›
      </button>
    </div>

    <section class="bg-gray-50 py-12 rounded-lg shadow-lg mb-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-4xl font-extrabold mb-6 text-center text-gray-800">Noticias y Actualidad</h2>
        <p class="text-sm md:text-lg text-gray-600 mb-10 text-center">
          Mantente al tanto de las últimas novedades sobre el Club San Lorenzo de Almagro.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/public/noticia.jpg" alt="Noticia 1" class="w-full h-56 object-cover">
            <div class="p-6">
              <h3 class="text-xl md:text-2xl font-bold mb-4 text-blue-600">¡Excelentes noticias desde San Lorenzo de Almagro!</h3>
              <p class="text-xs md:text-sm text-gray-500 mb-2">Publicado el: 10/07/2024</p>
              <p class="text-sm md:text-gray-700 leading-relaxed mb-4">
                El equipo de reserva ha brillado en sus últimos tres partidos, asegurando victorias consecutivas que los colocan en lo más alto de la tabla.
                Los jóvenes talentos azulgranas demostraron su habilidad y determinación en cada encuentro, destacándose por su juego en equipo y espíritu competitivo. Con un rendimiento excepcional, han ganado confianza y han dejado claro que son una fuerza a tener en cuenta en el futuro.
              </p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/public/noticia2.jfif" alt="Noticia 2" class="w-full h-56 object-cover">
            <div class="p-6">
              <h3 class="text-xl md:text-2xl font-bold mb-4 text-blue-600">¡San Lorenzo celebra la inauguración de su nueva academia deportiva!</h3>
              <p class="text-xs md:text-sm text-gray-500 mb-2">Publicado el: 01/08/2024</p>
              <p class="text-sm md:text-gray-700 leading-relaxed mb-4">
                El Club Atlético San Lorenzo de Almagro inauguró hoy su nueva academia deportiva, un moderno complejo dedicado al desarrollo integral de jóvenes talentos. La academia cuenta con instalaciones de última generación para entrenamiento físico y técnico, así como aulas dedicadas a la formación académica de los deportistas.
              </p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/public/noticia3.jfif" alt="Noticia 3" class="w-full h-56 object-cover">
            <div class="p-6">
              <h3 class="text-xl md:text-2xl font-bold mb-4 text-blue-600">San Lorenzo de Almagro anuncia la renovación del estadio Pedro Bidegain</h3>
              <p class="text-xs md:text-sm text-gray-500 mb-2">Publicado el: 05/06/2024</p>
              <p class="text-sm md:text-gray-700 leading-relaxed mb-4">
                El Club Atlético San Lorenzo de Almagro ha anunciado oficialmente la renovación completa del estadio Pedro Bidegain, conocido popularmente como el Nuevo Gasómetro. Esta actualización incluye mejoras significativas en la infraestructura y comodidades para los aficionados, así como tecnología de vanguardia para mejorar la experiencia de los espectadores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <img src="/public/banner.png" class="img-fluid" alt="banner">

    <!-- Sección Nuestros Jugadores -->
    <section class="bg-white py-12 rounded-lg shadow-lg mb-12">
      <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">Nuestros Jugadores</h2>
      <div class="flex flex-col md:flex-row justify-center gap-8">
        <button @click="navigateToReserva" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">
          Ver Jugadores de Reserva
        </button>
        <button @click="navigateToInfantiles" class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none">
          Ver Jugadores Infantiles
        </button>
      </div>
    </section>

    <!-- Próximos Partidos Section -->
    <section class="bg-gray-100 py-12 rounded-lg shadow-lg mb-12">
      <h2 class="text-2xl md:text-3xl font-extrabold mb-8 text-center text-gray-800">Próximos Partidos</h2>
      <ul class="divide-y divide-gray-200">
        <li class="p-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <span class="text-lg font-semibold text-blue-600">10/08/2024 - 20:00</span>
            <div class="flex items-center justify-center flex-1">
              <div class="flex items-center mx-2">
                <img src="/public/escudo_sl.jpg" alt="San Lorenzo de Almagro" class="w-12 h-12 mr-2">
                <span class="font-bold italic">San Lorenzo de Almagro</span>
              </div>
              <div class="mx-4 text-center">vs</div>
              <div class="flex items-center mx-2">
                <img src="/public/escudo_hr.png" alt="Huracan" class="w-12 h-12 mr-2">
                <span class="font-bold italic">Huracan</span>
              </div>
            </div>
            <span class="text-lg font-semibold text-green-600">Estadio Pedro Bidegain</span>
          </div>
        </li>
        <li class="p-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <span class="text-lg font-semibold text-blue-600">15/08/2024 - 18:00</span>
            <div class="flex items-center justify-center flex-1">
              <div class="flex items-center mx-2">
                <img src="/public/escudo_df.png" alt="Defensa y Justicia" class="w-12 h-12 mr-2">
                <span class="font-bold italic">Defensa y Justicia</span>
              </div>
              <div class="mx-4 text-center">vs</div>
              <div class="flex items-center mx-2">
                <img src="/public/escudo_sl.jpg" alt="San Lorenzo de Almagro" class="w-12 h-12 mr-2">
                <span class="font-bold italic">San Lorenzo de Almagro</span>
              </div>
            </div>
            <span class="text-lg font-semibold text-green-600">Estadio Norberto Tomaghello</span>
          </div>
        </li>
      </ul>
    </section>

    <!-- Sección del Calendario de Eventos -->
    <section class="bg-gray-50 py-12 rounded-lg shadow-lg mb-12">
      <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">Calendario de Eventos</h2>
      <div v-if="isAdmin" class="mb-6 text-center">
        <button @click="showEventForm = !showEventForm" class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none">
          {{ showEventForm ? 'Cerrar' : 'Agregar Evento' }}
        </button>
      </div>
      <div v-if="showEventForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-xl font-bold mb-4">Agregar Evento</h3>
        <form @submit.prevent="addEvent">
          <div class="mb-4">
            <label for="eventDate" class="block text-gray-700 font-bold mb-2">Fecha:</label>
            <input v-model="newEvent.date" id="eventDate" type="date" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="mb-4">
            <label for="eventType" class="block text-gray-700 font-bold mb-2">Tipo de Evento:</label>
            <select v-model="newEvent.type" id="eventType" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
              <option value="partido">Partido</option>
              <option value="entrenamiento">Entrenamiento</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="eventTitle" class="block text-gray-700 font-bold mb-2">Título del Evento:</label>
            <input v-model="newEvent.title" id="eventTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">
              Agregar Evento
            </button>
          </div>
        </form>
      </div>
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div v-if="!isMobile" class="grid grid-cols-7 gap-1">
          <div v-for="day in days" :key="day" class="py-2 text-center font-bold bg-gray-200 text-gray-800">{{ day }}</div>
          <div v-for="blank in startDay" :key="blank" class="py-2"></div>
          <div v-for="date in dates" :key="date" class="relative p-4 border border-gray-200">
            <span class="absolute top-2 right-2 text-xs font-bold text-gray-500">{{ date }}</span>
            <div v-if="events[date]" class="mt-6">
              <div v-for="event in events[date]" :key="event.id" :class="[event.type === 'partido' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800', 'text-xs', 'p-2', 'rounded-lg', 'mt-2']">
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="py-2 text-center font-bold bg-gray-200 text-gray-800 w-full">{{ days[currentDay % 7] }}</div>
          <div class="relative p-4 border border-gray-200 w-full">
            <span class="absolute top-2 right-2 text-xs font-bold text-gray-500">{{ currentDate }}</span>
            <div v-if="events[currentDate]" class="mt-6">
              <div v-for="event in events[currentDate]" :key="event.id" :class="[event.type === 'partido' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800', 'text-xs', 'p-2', 'rounded-lg', 'mt-2']">
                {{ event.title }}
              </div>
            </div>
          </div>
          <div class="flex justify-between w-full mt-4">
            <button @click="prevDay" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">
              Día Anterior
            </button>
            <button @click="nextDay" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">
              Día Siguiente
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-4 space-x-4">
        <div class="flex items-center">
          <span class="w-4 h-4 inline-block bg-blue-100 mr-2 rounded-full"></span>
          <span class="text-gray-700">Partido</span>
        </div>
        <div class="flex items-center">
          <span class="w-4 h-4 inline-block bg-red-100 mr-2 rounded-full"></span>
          <span class="text-gray-700">Entrenamiento</span>
        </div>
      </div>
    </section>

    <!-- Tabla de posiciones -->
    <section class="bg-white py-8 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">Tabla de Posiciones de la Reserva 2024</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Posición</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Equipo</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">PJ</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">G</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">E</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">P</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">GF</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">GC</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">DG</th>
              <th class="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in leagueTable" :key="team.position" :class="{'bg-gray-100': team.position % 2 === 0, 'bg-white': team.position % 2 !== 0}">
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.position }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.name }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.played }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.won }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.drawn }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.lost }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.goalsFor }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.goalsAgainst }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.goalDifference }}</td>
              <td class="border-t px-2 md:px-6 py-3 text-xs md:text-sm">{{ team.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);
    const isAdmin = ref(false);
    const showEventForm = ref(false);
    const newEvent = ref({
      date: '',
      type: 'partido',
      title: ''
    });

    const navigateToReserva = () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          router.push('/reserva');
        } else {
          router.push('/login');
        }
      });
    };

    const navigateToInfantiles = () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          router.push('/infantiles');
        } else {
          router.push('/login');
        }
      });
    };

    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const startDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const dates = Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => i + 1);
    const events = ref({
      5: [
        { id: 1, title: 'San Lorenzo vs Independiente', type: 'partido' }
      ],
      10: [
        { id: 2, title: 'San Lorenzo vs Huracan', type: 'partido' }
      ],
      15: [
        { id: 3, title: 'Defensa y Justicia vs San Lorenzo', type: 'partido' }
      ],
      20: [
        { id: 4, title: 'San Lorenzo vs Estudiantes', type: 'partido' }
      ],
      25: [
        { id: 5, title: 'San Lorenzo vs Boca', type: 'partido' }
      ],
      29: [
        { id: 6, title: 'San Lorenzo vs Argentinos Junior', type: 'partido' }
      ],
      3: [
        { id: 7, title: 'Entrenamiento en Ciudad Deportiva', type: 'entrenamiento' }
      ],
      8: [
        { id: 8, title: 'Entrenamiento en Ciudad Deportiva', type: 'entrenamiento' }
      ],
      12: [
        { id: 9, title: 'Entrenamiento en Ciudad Deportiva', type: 'entrenamiento' }
      ],
      18: [
        { id: 10, title: 'Entrenamiento en Ciudad Deportiva', type: 'entrenamiento' }
      ],
      22: [
        { id: 11, title: 'Entrenamiento en Ciudad Deportiva', type: 'entrenamiento' }
      ]
    });

    const currentSlide = ref(0);
    const isMobile = ref(window.innerWidth < 768);

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + 2) % 2;
    };

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % 2;
    };

    const leagueTable = [
      { position: 1, name: 'River Plate', played: 14, won: 10, drawn: 2, lost: 2, goalsFor: 25, goalsAgainst: 10, goalDifference: 15, points: 32 },
      { position: 2, name: 'San Lorenzo', played: 14, won: 9, drawn: 3, lost: 2, goalsFor: 20, goalsAgainst: 8, goalDifference: 12, points: 30 },
      { position: 3, name: 'Boca Juniors', played: 14, won: 8, drawn: 4, lost: 2, goalsFor: 18, goalsAgainst: 9, goalDifference: 9, points: 28 },
      { position: 4, name: 'Racing Club', played: 14, won: 7, drawn: 5, lost: 2, goalsFor: 16, goalsAgainst: 10, goalDifference: 6, points: 26 },
      { position: 5, name: 'Independiente', played: 14, won: 6, drawn: 4, lost: 4, goalsFor: 15, goalsAgainst: 12, goalDifference: 3, points: 22 },
      { position: 6, name: 'Vélez Sarsfield', played: 14, won: 6, drawn: 3, lost: 5, goalsFor: 14, goalsAgainst: 14, goalDifference: 0, points: 21 },
      { position: 7, name: 'Huracán', played: 14, won: 5, drawn: 5, lost: 4, goalsFor: 12, goalsAgainst: 10, goalDifference: 2, points: 20 },
      { position: 8, name: 'Lanús', played: 14, won: 5, drawn: 4, lost: 5, goalsFor: 10, goalsAgainst: 11, goalDifference: -1, points: 19 },
      { position: 9, name: 'Defensa y Justicia', played: 14, won: 4, drawn: 6, lost: 4, goalsFor: 12, goalsAgainst: 13, goalDifference: -1, points: 18 },
      { position: 10, name: 'Estudiantes', played: 14, won: 4, drawn: 5, lost: 5, goalsFor: 10, goalsAgainst: 12, goalDifference: -2, points: 17 },
      { position: 11, name: 'Argentinos Juniors', played: 14, won: 3, drawn: 5, lost: 6, goalsFor: 8, goalsAgainst: 11, goalDifference: -3, points: 14 },
      { position: 12, name: 'Talleres', played: 14, won: 3, drawn: 4, lost: 7, goalsFor: 10, goalsAgainst: 15, goalDifference: -5, points: 13 },
      { position: 13, name: 'Colón', played: 14, won: 2, drawn: 4, lost: 8, goalsFor: 6, goalsAgainst: 18, goalDifference: -12, points: 10 },
      { position: 14, name: 'Central Córdoba', played: 14, won: 1, drawn: 3, lost: 10, goalsFor: 5, goalsAgainst: 20, goalDifference: -15, points: 6 }
    ];

    const currentDay = ref(startDay);
    const currentDate = ref(dates[currentDay.value - startDay]);

    const prevDay = () => {
      if (currentDay.value > 0) {
        currentDay.value -= 1;
        currentDate.value = dates[currentDay.value - startDay];
      }
    };

    const nextDay = () => {
      if (currentDay.value < dates.length - 1) {
        currentDay.value += 1;
        currentDate.value = dates[currentDay.value - startDay];
      }
    };

    const addEvent = () => {
      const date = newEvent.value.date.split('-')[2];
      if (!events.value[date]) {
        events.value[date] = [];
      }
      events.value[date].push({
        id: Date.now(),
        title: newEvent.value.title,
        type: newEvent.value.type
      });
      newEvent.value = { date: '', type: 'partido', title: '' };
      showEventForm.value = false;
    };

    onAuthStateChanged(auth, currentUser => {
      user.value = currentUser;
      if (user.value) {
        isAdmin.value = true;
      }
    });

    watchEffect(() => {
      const updateIsMobile = () => {
        isMobile.value = window.innerWidth < 768;
      };

      updateIsMobile(); // Initial check
      window.addEventListener('resize', updateIsMobile);

      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('resize', updateIsMobile);
      };
    });

    return {
      navigateToReserva,
      navigateToInfantiles,
      days,
      startDay,
      dates,
      events,
      currentSlide,
      isMobile,
      prevSlide,
      nextSlide,
      leagueTable,
      isAdmin,
      showEventForm,
      newEvent,
      addEvent,
      currentDay,
      currentDate,
      prevDay,
      nextDay
    };
  }
};
</script>

<style scoped>
.btn-primary {
  @apply px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105;
}

.btn-secondary {
  @apply px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105;
}

.upcoming-matches {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.upcoming-matches h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.match-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.match-list li {
  padding: 30px;
  border-bottom: 1px solid #ddd;
}

.match-list li:last-child {
  border-bottom: none;
}

.match-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.match-date {
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
}

.teams {
  display: flex;
  align-items: flex-start;
}

.team {
  display: flex;
  align-items: center;
  margin: 0 20px;
}

.team-logo {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border-radius: 5px;
}

.vs {
  font-size: 24px;
  font-weight: bold;
  margin: 0 20px;
}

.match-venue {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: #fff;
}

table th,
table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

table tbody + tbody {
  border-top: 2px solid #dee2e6;
}
.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  min-width: 100%;
  transition: opacity 0.5s ease;
}

.carousel-item.relative {
  position: relative;
}

.carousel-item .bg-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.carousel-item .text-overlay {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.carousel-item .text-overlay .text-center {
  text-align: center;
  color: white;
}
.flex-1 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .flex-2 {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
