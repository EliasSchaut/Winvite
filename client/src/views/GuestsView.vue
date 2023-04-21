<template>
    <div v-if="$route.params.status === 'success'" class="alert alert-success" role="alert" id="alert_success"
         style="text-align: center">
        {{ status.success }}
    </div>
    <div v-if="$route.params.status === 'error'" class="alert alert-danger" role="alert" id="alert_error"
         style="text-align: center">
        {{ status.error }}
    </div>

    <div class="numbers">
        <p class="">{{ guests.count.pre }}</p>
        <p id="member_count" class="huge">{{ gql_guests.count }}</p>
        <p class="big">{{ guests.count.post }}</p>
    </div>

    <div class="guests">
        <p class="big text-decoration-underline"><b> {{ guests.title }} </b></p>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">{{ guests.forename }}</th>
                <th scope="col">{{ guests.surname }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="guest of gql_guests.guests">
                <td>{{ guest.first_name }}</td>
                <td>{{ guest.last_name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import gql from 'graphql-tag';
import type { GuestsModel } from '@/types/models/guests.model';
import { query } from '@/util/graphql';

const gql_guests = ref<GuestsModel>({ count: 0, guests: [] });

export default {
    name: 'GuestsView',
    data() {
        return {
            gql_guests: gql_guests,
            guests: {
                title: 'Gästeliste',
                forename: 'Vorname',
                surname: 'Nachname',
                count: {
                    pre: 'Schon',
                    value: ref('??'),
                    post: 'SIND DABEI!'
                },
                list: ref([])
            },

            api_base: 'https://api.schaut.dev/bday/',

            status: {
                success: 'Du hast dich erfolgreich registriert!',
                error: 'Error! Cannot fetch bday_members!'
            }
        }
    },
    mounted() {
        query(gql`
                query get_guests {
                    guests {
                        count,
                        guests {
                            first_name,
                            last_name
                        }
                    }
                }
            `
        ).then((data) => {
            gql_guests.value = data.guests;
        });
    },
}
</script>

<style scoped>
.numbers {
    display: flex;
    flex-direction: column;

    margin-top: 30px;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
}

.guests {
    width: 400px;
    text-align: center;
    margin: 30px auto 50px;
}

table {
    margin-bottom: 30px;
}

</style>