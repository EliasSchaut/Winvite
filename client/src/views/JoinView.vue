<template>
    <!-- Alerts ------------------------------------------------------->
    <div v-if="$route.params.status === 'error'" id="alert_error" class="form alert alert-danger" role="alert">
        <span v-html="status.error" />
    </div>
    <div v-if="$route.params.status === 'not_acceptable'" id="alert_invalid_name" class="form alert alert-danger" role="alert">
        <span v-html="status.not_acceptable" />
    </div>
    <div v-if="$route.params.status === 'duplicate'" id="alert_not_acceptable" class="form alert alert-danger" role="alert">
        <span v-html="status.duplicate" />
    </div>
    <!----------------------------------------------------------------->


    <!-- From ------------------------------------------------------->
    <div class="form-intro">
        <p class="big"><b>Melde dich an!</b></p>
        <p>Damit stehst du automatisch auf der Gästeliste und bist dabei!</p>
    </div>

    <form @submit.prevent="form_submit" id="form_register" class="form needs-validation">
        <div class="mb-3">
            <label for="from_forename" class="form-label">Vorname</label>
            <input type="text" class="form-control" id="from_forename" placeholder="Max" name="forename" required>
        </div>

        <div class="mb-3">
            <label for="from_surname" class="form-label">Nachname</label>
            <input type="text" class="form-control" id="from_surname" placeholder="Mustermann" name="surname" required>
        </div>

        <div v-for="checkbox in this.form.checkboxes" class="form-check">
            <input @toggle="" :id="'form_check_' + checkbox.name" :name="checkbox.name" onclick=""
                   class="form-check-input" type="checkbox" data-bs-toggle="modal" :data-bs-target="'#modal_' + checkbox.name">
            <label v-html="checkbox.label" class="form-check-label" :for="'form_check_' + checkbox.name"/>
        </div>

        <button v-if="!loading.value" id="button_submit" type="submit" class="btn btn-primary form-submit" data-bs-placement="bottom">
            {{ this.form.submit.name }}
        </button>

        <button v-if="loading.value" id="button_loading" type="submit" class="btn btn-primary form-submit" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            {{ this.form.submit.loading }}
        </button>
    </form>
    <!----------------------------------------------------------------->


    <!-- Modals ------------------------------------------------------->
    <div v-for="modal in this.form.modals" class="modal fade" :id="'modal_' + modal.ref" data-bs-backdrop="static"
         data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>{{ modal.title }}</b></h5>
                </div>
                <div v-html="modal.body" class="modal-body"/>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="this.dispose" data-bs-dismiss="modal">{{ modal.button }}</button>
                </div>
            </div>
        </div>
    </div>
    <!----------------------------------------------------------------->
</template>

<script lang="ts">
import {ref} from "vue"
import router from "../router/router";
import {add_member} from "@/assets/js/api";

let loading = ref(false)

export default {
    name: "JoinView",
    data() {
        return {
            api_base: "https://api.schaut.dev/bday/",

            status: {
                error: "Error! Es gab einen Fehler bei der Anmeldung! Du bist noch nicht registriert!",
                not_acceptable: "Error! Dein Name ist ungültig! Dein Name darf nur deutsche <b>Buchstaben</b> und folgende Zeichen enthalten: Leerzeichen, Punkt, Strich, Apostroph (').<br>Zudem muss jedes Feld mindestens einen Buchstaben enthalten und dein Name darf nicht mehr als 40 Zeichen beinhalten.",
                duplicate: "Error! Dieser Name ist schon in der Datenbank vorhanden! Falls du dich schon einmal angemeldet hast, solltest du dich nicht nochmal anmelden!"
            },

            form: {
                checkboxes: [
                    {
                        name: "need_bed",
                        label: "Ich brauche einen Schlafplatz"
                    },
                    {
                        name: "has_bed",
                        label: "Ich kann einen Schlafplatz anbieten"
                    },
                    {
                        name: "is_nerd",
                        label: "Ich will bei einem nerdigen Spiel teilnehmen"
                    },
                    {
                        name: "anonym",
                        label: "Ich möchte <b>nicht</b> in der <router-link to=\"/guests/\">öffentlichen Gästeliste</router-link> gelistet werden"
                    }
                ],
                modals: [
                    {
                        ref: "need_bed",
                        title: "Achtung!",
                        body: "Die Schlafplätze sind streng limitiert und sollten nur von Gästen benutzt werden, die einen wirklich langen Weg nach Hause haben. Wenn du in Karlsruhe oder naher Umgebung wohnst, wäre es gut, von einem Schlafplatz abzusehen!",
                        button: "Verstanden!"
                    },
                    {
                        ref: "is_nerd",
                        title: "Achtung!",
                        body: "Dieses Spiel ist nur für Hardcore-Nerds geeignet und stellt eine Meta-Ebene über mehrere Stunden des Geburtstags dar!<br>Wenn du also eher chillen willst, dann ist dieses Spiel wahrscheinlich nichts für dich! Wenn du aber auf Spiele wie <i>Secret Hitler</i> stehst, dann bist du herzlich eingeladen!",
                        button: "Verstanden!"
                    }
                ],
                submit: {
                    name: "Bestätigen",
                    loading: "Fertigstellen..."
                }
            }
        }
    },
    computed: {
        loading() {
            return loading
        }
    },
    methods: {
        async form_submit(form) {
            console.log(form)
            const form_data = new FormData(form.target)
            const regex_name = /^([a-z]| |\.|ö|ä|ü|ß|'|-)+$/i
            const forename = form_data.get("forename").trim()
            const surname = form_data.get("surname").trim()

            if (forename.length === 0
                || surname.length === 0
                || (forename.length + surname.length) >= 40
                || !regex_name.test(forename)
                || !regex_name.test(surname)) {
                return router.replace("/join/not_acceptable")
            }

            loading.value = true

            const form_body_urlencoded = []
            for (const form_key of form_data.keys()) {
                const encoded_key = encodeURIComponent(form_key)
                const encoded_value = encodeURIComponent(form_data.get(form_key))
                form_body_urlencoded.push(encoded_key + "=" + encoded_value.trim())
            }

            try {
                const res = await add_member(this.api_base, form_body_urlencoded.join('&'))
                console.log(res)

                if (res.status === 200) {
                    return router.replace("/guests/success")
                } else if (res.status === 406) {
                    loading.value = false
                    return router.replace("/join/not_acceptable")
                } else {
                    loading.value = false
                    return router.replace("/join/error")
                }
            } catch (err) {
                console.log(err)
                loading.value = false
                return router.replace("/join/error")
            }
        }
    },
    setup() {
        loading.value = false
    },
}
</script>

<style scoped>
.form-intro {
    margin: 1em 0;
    text-align: center;
}

.form {
    margin: 30px auto 0;
    width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.form-submit {
    margin-top: 20px
}

</style>