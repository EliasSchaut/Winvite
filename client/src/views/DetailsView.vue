<template>
    <div v-for="detail in details" class="details">
        <h1 class="big" :id="detail.title">{{ detail.title }}</h1>
        <span v-html="detail.value"></span>
    </div>
</template>

<script>
export default {
    name: "DetailsView",
    data() {
        return {
            details: [
                {
                    title: "Eckdaten",
                    value: "<ul><li><b>Datum</b>: 03. bis 04. Juni 2022</li><li><b>Uhrzeit</b>: Start 19 Uhr (Einlass 18:30) bis Open End</li><li><b>Adresse</b>: Lorem Ipsum 42</li><li>Auf Maps: [<a href=\"https://jacksonpollock.org/\">Google-Maps</a>] [<a href=\"https://jacksonpollock.org/\">Apple-Karten</a>] [<a href=\"https://jacksonpollock.org/\">OpenStreetMap</a>]</li>\<li>Anfahrt:<ul><li>Auto: Kostenfreies Parken nördlich des Klosterwegs</li><li>Öffentlich:<ul><li>RB2/RE2: [<a href=\"https://jacksonpollock.org/\">Google-Maps</a> (Mit Fußweg)] [<a href=\"https://jacksonpollock.org/\">Google-Maps</a> (Kürzer)]</li><li>S3/ICE/etc.: [<a href=\"https://jacksonpollock.org/\">Google-Maps</a>]</li></ul></li></ul></li></ul>"
                },
                {
                    title: "Programm",
                    "value": "<ul><li>18:30 - Einlass</li><li>19:00 - Offizieller Beginn</li><li>19:00 - Eröffnung aller Stationen (Karaoke, Grill, Zapfstand, Billard)</li><li>20:00 - Offizielle Durchsage (Elias) zur Erklärung des Abends</li><li>20:30 - Klassenkampf: Olympia</li><li>22:30 - Klassenkampf: Kahoot</li><li>23:45 - Versammlung Hauptraum K2-Bar</li><li>24:00 - Runterzählen + Gratulation, Kuchen, Geschenke, etc.</li><li>01:00 - Auflösung Klassenkampf + Abbau Karaoke + Aufbau Tanzfläche</li><li>01:30 - Eröffnung Disco</li><li>Danach - Open End</li></ul>"
                },
                {
                    title: "Was kann ich mitbringen?",
                    value: "<ul><li>Grillgut für den Grill (Salat, Fleisch, Käse, usw.)</li><li>Geld für die Theken-Getränke</li><li>Leckereien: Kuchen, Snacks, o.ä.</li><li>Getränke (aber wir haben genug von allem)</li><li>Spiele: Karten-, Brettspiele o.ä.</li><li>Fett Motivation!!!</li><li>Geschenke (optional (￣y▽,￣)╭ )</li><li>Schlafzeug (Klamotten/Isomatte/Schlafsack)<br>im Falle einer Übernachtung</li></ul>",
                },
                {
                    title: "Wie funktioniert der Klassenkampf?",
                    value: 'Im Klassenkampf kämpft Team <b class="red">Rot</b> gegen Team <b class="blue">Blau</b> in verschiedensten Disziplinen. Dazu wird eine Währung (Pokerchips) eingeführt, die man bei jedem Spiel setzten kann. Jedes Teammitglied kann jemanden aus einem anderen Team zu einem Spiel herausfordern und dabei eine variable Anzahl an Chips setzten. Ist der Gegner einverstanden, wird gespielt. Der Sieger einer Spielerunde bekommt dann die Anzahl der zuvor gesetzten Chips vom Gegner.<br><br>Es gibt zudem zwei Spezial-Programmpunkte zum Thema Klassenkampf (Olympia & Kahoot).In diesen einigen sich beide Teams auf eine Zahl an Chips, die sie setzen möchten und dann wird gespielt.<br><br>Alle, die sich rechtzeitig (bis 01.06. 23:55 Uhr) auf dieser Webseite anmelden, werden zufällig einem der beiden Teams <b class="red">Rot</b> bzw. <b class="blue">Blau</b> zugeordnet. Bei der Anmeldung vor Ort bekommt dann jedes Teammitglied seine Zugehörigkeit mitgeteilt undzwei Chips übergeben! Jedes Teammitglied bekommt dabei einen Button in der entsprechenden <b class="red">F</b><b class="blue">a</b><b class="red">r</b><b class="blue">b</b><b class="red">e</b> zum Anstecken. So können sofort Zugehörigkeiten von Außen erkannt werden!<br><br>Am Ende gewinnt jedes Team einen prozentualen Anteil vom Preis abhängig vom prozentualen Anteil der Chips des jeweiligen Teams. Beispiele für Spiele-Disziplinen sind:</p><ul><li>Karaoke</li><li>Billard</li><li>Wikingerschach</li><li>Bierpong</li><li>Slack-Line</li><li>Schere-Stein-Papier</li><li>Eigene erfundene Spiele</li></ul>',
                },
                {
                    title: "FAQ",
                    value: '<p><b>Q: Welche Corona-Regeln werden gelten?</b><br>A: Kurzgesagt keine! Jedoch sollte man nicht kommen,<br>wenn man Symptome verspürt!<br>Falls die Corona-Regeln sich wieder verschärfen sollten,<br>gibt es diesbezüglich ein Update.</p><p><b>Q: Bis wann sollte ich mich spätestens angemeldet haben?</b><br>A: Gerne so bald wie möglich, spätestens aber bitte 2 Tage vorher!</p><p><b>Q: Die Website gibt mir einen Error bei der Anmeldung bzw.<br>bekommt keine Daten bei der öffentlichen Gästeliste?</b><br>A: Das kann passieren, wenn der Datenbank-Server seine<br>IP-Adresse ändert.Warte einfach eine Viertelstunde,<br>dann sollte es wieder gehen. Falls nicht, schreibe Elias an!</p><p><b>Q: Ich habe mich angemeldet,<br>möchte mich aber wieder abmelden?</b><br>A: Schreibe Elias mit deinem vollen<br>Namen an. Er kann dich austragen!</p><p><b>Q: Ich habe mich angemeldet,<br>aber mit falschem Namen bzw. Einstellungen?</b><br>A: Schreibe Elias mit deinem vollen Namen an. Er löscht dich<br>aus der DB und du kannst dich einfach neu anmelden!</p><p><b>Q: Ich habe mich angemeldet,<br>aber ich weiß nicht mehr, welche Haken ich gesetzt habe?</b><br>A: Schreibe Elias mit deinem vollen Namen an.<br>Er kann dir sagen, was du gesetzt hast!</p><p><b>Q: Was passiert mit meinen Daten?</b><br>A: Lies die <router-link to="/privacy">Datenschutzerklärung</router-link></p><p><b>Q: Werde ich Spaß haben?</b><br>A: JA, du wirst Spaß haben!</p>',
                }
            ]
        }
    }
}
</script>

<style scoped>
.details {
    display: flex;
    width: min(80vw, 900px);
    flex-direction: column;
    justify-content: center;
    margin: 20px auto 20px;
    align-items: center;
    font-size: larger;
}

.red {
    color: red;
}

.blue {
    color: blue;
}
</style>