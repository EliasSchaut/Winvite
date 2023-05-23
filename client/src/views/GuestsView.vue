<template>
  <div class="numbers">
    <p class="">{{ $t('guests.count.pre') }}</p>
    <p id="member_count" class="huge">{{ gql_guests.count }}</p>
    <p class="big">{{ $t('guests.count.post') }}</p>
  </div>

  <div class="guests">
    <p class="big text-decoration-underline">
      <b> {{ $t('guests.title') }} </b>
    </p>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">{{ $t('common.form.first_name.label') }}</th>
            <th scope="col">{{ $t('common.form.last_name.label') }}</th>
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
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import type { GuestlistModel } from '@/types/models/guestlist.model'
import { query } from '@/util/graphql'

const gql_guests = ref<GuestlistModel>({ count: 0, guests: [] })

export default {
  name: 'GuestsView',
  data() {
    return {
      gql_guests: gql_guests
    }
  },
  mounted() {
    query(gql`
      query get_guests {
        guestlist {
          count
          guests {
            first_name
            last_name
          }
        }
      }
    `).then((data) => {
      gql_guests.value = data.guests
    })
  }
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
  width: min(400px, 90vw);
  text-align: center;
  margin: 30px auto 50px;
}

table {
  margin-bottom: 30px;
}
</style>
