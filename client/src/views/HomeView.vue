<template>
  <div class="content">
    <div class="video">
      <video :src="video" volume="0.5" controls></video>

      <p class="capture big center">
        <b>{{ video_sub }}</b>
      </p>
    </div>

    <p class="capture center huge handwritten">
      <b>{{ $t('home.title') }}</b>
    </p>

    <div class="adds">
      <div v-for="add in adds" class="add card">
        <img
          v-if="add.img !== ''"
          :alt="add.title"
          :src="add.img"
          class="card-img-top"
          width="600"
        />
        <div class="card-body">
          <p class="card-title capture big">
            <b>{{ add.title }}</b>
          </p>
          <p class="card-text" v-html="add.desc"></p>
        </div>
      </div>
    </div>

    <p class="capture center huge handwritten">
      <b>{{ $t('home.join.title') }}</b>
    </p>

    <div class="arrows">
      <img
        id="arrow-down"
        alt="arrow-down"
        class="arrow"
        src="@/assets/svg/arrow-down-circle-fill.svg"
      />
      <div>
        <img
          id="arrow-right"
          alt="arrow-right"
          class="arrow"
          src="@/assets/svg/arrow-right-circle-fill.svg"
        />
        <router-link class="btn btn-success join_margin" to="/join" type="button">
          {{ $t('home.join.button') }}>
        </router-link>
        <img
          id="arrow-left"
          alt="arrow-left"
          class="arrow"
          src="@/assets/svg/arrow-left-circle-fill.svg"
        />
      </div>
      <img id="arrow-up" alt="arrow-up" class="arrow" src="@/assets/svg/arrow-up-circle-fill.svg" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
  data() {
    return {
      video: 'vid/was_geht.mp4',
      video_sub: 'Halte dir die Nacht vom 03. auf den 04. Juni frei!',

      adds: [
        {
          title: 'Karaoke (Ultrastar)',
          desc:
            'Lass deine Stimmbänder zu epischer Karaoke vibrieren - mit einer Songauswahl von über 5.000 Songs an 4 Mikros bis 1 Uhr!<br>' +
            'Song Liste: <a href="https://schaut.dev/p/ultrastar/">https://schaut.dev/p/ultrastar/</a>',
          img: 'img/karaoke.jpg'
        },
        {
          title: 'Club-Atmosphere mit Lightshow!',
          desc: 'Erlebe ab 1:30 Uhr einen epischen Dancefloor mit immersiver Lightshow. Wir haben Nebel, Strobo, über 1000 einzeln ansteuerbare RGB-Leuchten, banger Boxen und vllt einen DJ!',
          img: 'img/dj.png'
        },
        {
          title: 'Freies Billard die ganze Nacht!',
          desc: 'Du wolltest mal wieder Billard spielen, aber nicht dafür zahlen? Perfekt! Während des gesamten Geburtstags kannst du kostenfrei so viel Billard spielen, wie du willst. Wir haben brandneue Bälle und ein semi anständiges Queue-Set!',
          img: 'img/billard.png'
        },
        {
          title: 'Grillen mit Ausblick auf der Dachterrasse!',
          desc: 'Wir haben den besten Grillminister am Start, der bis Mitternacht eure mitgebrachten Köstlichkeiten auf den Grill schmeißt! Einfaches Grillgut wie Baguettes, Würstchen werden sogar kostenlos zur Verfügung gestellt. Wunderschöner knallroter Sonnenuntergang und Ausblick auf Wald und Wiese inklusive!',
          img: 'img/grill.JPG'
        },
        {
          title: 'Freibier (gezapft)',
          desc: 'Genieße frisch gezapftes Bier völlig frei (solange der Vorrat reicht)! Zusätzlich kann auch Zitronenlimonade eingemischt werden, um frisches Radler genießen zu können.',
          img: 'img/zapfe.jpg'
        },
        {
          title: 'Große Getränkewahl zum kleinen Preis!',
          desc: 'Die K2-Bar hat eine große Auswahl vielfältiger Getränke, die zum kleinen Preis genossen werden können.\nDenkt also daran, auch etwas Kleingeld mitzunehmen!<br>Getränkekarte in höherer Auflösung: [<a href="/img/drinks_full.png">png</a>]',
          img: 'img/drinks.png'
        },
        {
          title: 'Der Klassenkampf in ganz neuer Form!',
          desc: 'Zwei Teams kämpfen gegeneinander in Kampf-, Gewinn- oder eigenen Spielen, um anteilig mehr von einem Preis zu gewinnen! Erfahre mehr in den <router-link to="/details#wie-funktioniert-der-klassenkampf">Details</router-link>!',
          img: 'img/fight.JPG'
        },
        {
          title: 'Supergeheimes Meta-Programm für Hardcore-Nerds!',
          desc: 'Für die richtigen Hardcore-Nerds ist ein Meta-Programm parallel zum Geburtstag zum Spielen vorhanden. Wer teilnehmen will, muss bei der Anmeldung auf dieser Website den Haken <i>Ich will bei einem nerdigen Spiel teilnehmen</i> setzten',
          img: 'img/mystery.png'
        }
      ],
    }
  }
}
</script>

<style scoped>
.video {
    display: flex;
    flex-direction: column;
    width: min(800px, 90vw);
    margin: 30px 0;
    align-self: center;
}

.adds {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
}

.add {
    width: 600px;
    margin: 20px 0;
}
</style>
