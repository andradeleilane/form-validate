import { useState } from 'react'
import { useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

import styles from './form.module.css'

const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ],
   'As senhas precisam ser iguais'
  )
})
.required()

function App() {

  const [isSuccess, setIsSuccess] = useState(false)
  
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {something: 'anything'}
    })

  const onSubmit = () => {
    setIsSuccess(true)
    reset()
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contentForm}>

      <div className={styles.formGroup}>
        <input 
          type="text" 
          placeholder="Insira seu nome"
          {...register("name")}
          className={(errors.name) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.name?.message}</span>
      </div>

      <div className={styles.formGroup}>
        <input 
          type="email" 
          placeholder="Insira seu e-mail"
          {...register("email")}
          className={(errors.email) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.email?.message}</span>
      </div>

      <div className={styles.formGroup}>
        <input 
          type="password" 
          placeholder="Insira sua senha"
          {...register("password")}
          className={(errors.password) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.password?.message}</span>
      </div>

      <div className={styles.formGroup}>
        <input 
          type="password" 
          placeholder="Confirme sua senha"
          {...register("password_confirmation")}
          className={(errors.password_confirmation) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.password_confirmation?.message}</span>
      </div>

      <button type="submit">Enviar formulário</button>

      {
        isSuccess && 
        <p>Formulário enviado com sucesso!</p>
      }
    
      </form>
    </>
  )
}

export default App
