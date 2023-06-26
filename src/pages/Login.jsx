import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import styles from '../styles/styles.module.scss';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login, loading, error } = useLogin();

    const onSubmit = async data => {
        await login(data.email, data.password);
        reset({ email: '', password: '' })
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <h3> Log In </h3>
           
                <input
                    type="email"
                    {...register("email", { required: 'required field' })}
                    placeholder="email"
                    autoComplete="off"
                    className={styles.inputField}
                />

            <p className={styles.errorMessage}>{errors.email?.message}</p>
                <input
                    type="password"
                    {...register("password", { required: 'required field' })}
                    placeholder="password"
                    className={styles.inputField}
                />

            <p className={styles.errorMessage}>{errors.password?.message}</p>
            <button
                className={`${styles.submitButton} ${loading && styles.disabled}`}
                type="submit"
                disabled={loading}
            >
                Log In
            </button>
            {error && <div>{error}</div>}
        </form>
    );
}

export default Login;