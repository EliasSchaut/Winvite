<template>
    <p class="capture center huge handwritten"><b>{{ this.table.title }}</b></p>

    <table class="table table-bordered border-dark" style="width: min(600px, 90vw); margin: auto">
        <thead>
        <tr>
            <th scope="col">{{ this.table.head_stand }}</th>
            <th scope="col">{{ this.table.head_time }}</th>
            <th scope="col">{{ this.table.head_assist }}</th>
        </tr>
        </thead>

        <!-- Aufbau -->
        <tbody v-for="stand in this.table.stands">
            <tr v-for="(assist, number) in stand.assists">
                <td v-if="number === 0" :rowspan="stand.assists.length">{{ stand.name }}</td>
                <td>{{ assist.time }}</td>
                <td>{{ assist.name }}</td>
            </tr>
        </tbody>

    </table>



    <p class="capture center huge handwritten"><b>{{ help.title }}</b></p>

    <p class="center" v-html="help.desc"></p>

    <div class="arrows">
        <img id="arrow-down" class="arrow" src="/svg/arrow-down-circle-fill.svg" alt="arrow-down">
        <div>
            <img id="arrow-right" class="arrow" src="/svg/arrow-right-circle-fill.svg" alt="arrow-right">
            <router-link class="btn btn-success join_margin" type="button" to="/help">Wähle deine Schicht!</router-link>
            <img id="arrow-left" class="arrow" src="/svg/arrow-left-circle-fill.svg" alt="arrow-left">
        </div>
        <img id="arrow-up" class="arrow" src="/svg/arrow-up-circle-fill.svg" alt="arrow-up">
    </div>
</template>

<script>
export default {
    name: "ShiftingsView",
    data() {
        return {
            table: {
                title: "Schichtplan",
                head_stand: "Stand",
                head_time: "Zeit",
                head_assist: "Helfer",
                stands: [
                    {
                        name: "Aufbau (Treffpunkt 14:45 Uhr)",
                        assists: [
                            {
                                name: "Max",
                                time: "ab 14:45"
                            },
                            {
                                name: "Mustermann",
                                time: "ab 14:45"
                            },
                            {
                                name: "Linda",
                                time: "ab 14:45"
                            },
                            {
                                name: "Sandra",
                                time: "ab 14:45"
                            },
                            {
                                name: "Thorsten",
                                time: "ab 14:45"
                            },
                        ]
                    },
                    {
                        name: "Anmeldung",
                        assists: [
                            {
                                name: "Dimitri",
                                time: "18:15 - 19:30"
                            },
                            {
                                name: "Heinz",
                                time: "19:15 - 20:30"
                            }
                        ]
                    },
                    {
                        name: "Zapfstand",
                        assists: [
                            {
                                name: "Raphael",
                                time: "18:30 - 20:30"
                            },
                            {
                                name: "Max",
                                time: "20:15 - 22:15"
                            }
                        ]
                    },
                ]
            },
            help: {
                title: "Wähle deine Schicht!",
                desc: "Du willst mir bei meinem Geburtstag unter die Arme greifen?<br>Sehr gut! Dann trage dich gerne unten in eine Schicht ein!"
            }

        }
    },
}
</script>

<style scoped>

</style>