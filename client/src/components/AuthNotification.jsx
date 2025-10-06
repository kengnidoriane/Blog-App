import { useState, useEffect } from 'react';
import { X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthNotification = ({ show, onClose, action = "continuer" }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <LogIn className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">
              Connexion requise
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Vous devez être connecté pour {action}
            </p>
            <div className="flex space-x-2 mt-3">
              <Link
                to="/login"
                className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                onClick={onClose}
              >
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="text-xs border border-green-600 text-green-600 px-3 py-1 rounded hover:bg-green-50 transition-colors"
                onClick={onClose}
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AuthNotification;