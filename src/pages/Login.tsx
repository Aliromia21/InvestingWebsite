import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/app");
    } catch (err: any) {
      setError("خطأ في البريد أو كلمة المرور"); 
    }
  };

  
};
