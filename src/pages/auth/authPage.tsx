import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { DI } from "../../services/di";
import { useRecoilState } from "recoil";
import { textState } from "../../state/auth";

interface IFormInputs {
    login: string,
    password: string,
}

const schema = yup.object({
    login: yup.string().required().min(2),
    password: yup.string().required().min(2).max(24),
}).required();

export default function AuthPage() {
    const [text, setText] = useRecoilState(textState);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

    const onSubmit = (data: IFormInputs) => {
        console.log(data);
        DI.navigateService.toUserPage();
        // new NavigateService(navigate).toUserPage();
    }

    return (
        <>
            <h4>Auth Page</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("login")} />
                <p>{errors.login?.message}</p>
                <input type="password" {...register("password")} />
                <p>{errors.password?.message}</p>
                <input type="submit" />
            </form>
        </>
    );
}