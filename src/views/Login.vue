<template>
  <form class='card auth-card' @submit.prevent='submitHandler()'>
    <div class='card-content'>
      <span class='card-title'>Домашняя бухгалтерия</span>
      <div class='input-field'>
        <input
          id='email'
          type='text'
          v-model='email'
          :class='{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}'
        />

        <label for='email'>Email</label>
        <small
          class='helper-text invalid'
          v-if='$v.email.$dirty && !$v.email.required'
        >Почта не должна быть пустой!</small>
        <small
          class='helper-text invalid'
          v-else-if='$v.email.$dirty && !$v.email.email'
        >Неккоректный адрес!</small>
      </div>
      <div class='input-field'>
        <input
          id='password'
          type='password'
          class='validate'
          :value='password'
          @input='password = $event.target.value'
          :class='{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}'
        />

        <label for='password'>Пароль</label>
        <small
          class='helper-text invalid'
          v-if='$v.password.$dirty && !$v.password.required'
        >Пароль не должен быть пустым!</small>
        <small
          class='helper-text invalid'
          v-else-if='$v.password.$dirty && !$v.password.minLength'
        >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов! Сейчас: {{ password.length }}</small>
      </div>
    </div>
    <div class='card-action'>
      <div>
        <button class='btn waves-effect waves-light auth-submit' type='submit'>
          Войти
          <i class='material-icons right'>send</i>
        </button>
      </div>

      <p class='center'>
        Нет аккаунта?
        <router-link to='/register'>Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import messages from '@/plugins/messages'

export default {
  data: () => ({
    email: '',
    password: '',
  }),

  validations: {
    email: {
      email,
      required,
    },
    password: {
      minLength: minLength(6),
      required,
    },
  },

  methods: {
    ...mapActions(['login']),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.login(formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
}
</script>