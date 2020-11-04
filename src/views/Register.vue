<template>
  <form class='card auth-card' @submit.prevent='submitHandler()'>
    <div class='card-content'>
      <span class='card-title'>Домашняя бухгалтерия</span>
      <div class='input-field'>
        <input
          id='email'
          type='text'
          v-model.trim='email'
          :class='{invalid: $v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email}'
        />
        <label for='email'>Email</label>
        <small
          class='helper-text invalid'
          v-if='$v.email.$dirty && !$v.email.required'
        >Почта не должна быть пустой!</small>
        <small
          class='helper-text invalid'
          v-if='$v.email.$dirty && !$v.email.email'
        >Неккоректный адрес!</small>
      </div>
      <div class='input-field'>
        <input
          id='password'
          type='password'
          class='validate'
          v-model.trim='password'
          :class='{invalid: $v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength}'
        />
        <label for='password'>Пароль</label>
        <small
          class='helper-text invalid'
          v-if='$v.password.$dirty && !$v.password.required'
        >Пароль не должен быть пустым!</small>
        <small
          class='helper-text invalid'
          v-else-if='$v.password.$dirty && !$v.password.minLength'
        >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов! Сейчас он {{ password.length }}</small>
      </div>
      <div class='input-field'>
        <input
          id='name'
          type='text'
          class='validate'
          v-model.trim='name'
          :class='{invalid: $v.name.$dirty && !$v.name.required || $v.name.$dirty && !$v.name.minLength }'
        />
        <label for='name'>Имя</label>
        <small
          class='helper-text invalid'
          v-if='$v.name.$dirty && !$v.name.required'
        >Имя не должно быть пустым!</small>
        <small
          class='helper-text invalid'
          v-else-if='$v.name.$dirty && !$v.name.minLength'
        >Имя должно быть не менее {{ $v.name.$params.minLength.min }} символов! Сейчас оно {{ name.length }}</small>
      </div>
      <p>
        <label>
          <input type='checkbox' v-model='checkbox' />
          <span
            style='color: red'
            v-if='$v.checkbox.$dirty && !$v.checkbox.checked'
          >С правилами согласен</span>
          <span style='color: gray' v-else>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class='card-action'>
      <div>
        <button class='btn waves-effect waves-light auth-submit' type='submit'>
          Зарегистрироваться
          <i class='material-icons right'>send</i>
        </button>
      </div>

      <p class='center'>
        Уже есть аккаунт?
        <router-link to='/login'>Войти!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
    checkbox: false,
  }),

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
      minLength: minLength(4),
    },
    checkbox: {
      checked: v => v,
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>