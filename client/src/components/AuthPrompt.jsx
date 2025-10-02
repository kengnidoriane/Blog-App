import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const AuthPrompt = ({ action = "continuer" }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Connexion requise
        </h3>
        <p className="text-gray-600 mb-6">
          Vous devez être connecté pour {action}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Se connecter
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

export default AuthPrompt;