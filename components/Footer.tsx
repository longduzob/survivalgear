import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">SurvivalGear</h3>
            <p className="text-sm text-gray-300">
              Votre partenaire pour l'équipement outdoor et survie de qualité.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/cgv" className="text-gray-300 hover:text-white">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/legal/mentions" className="text-gray-300 hover:text-white">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-300 hover:text-white">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/returns" className="text-gray-300 hover:text-white">
                  Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Délai de livraison: ~2 semaines</li>
              <li>Livraison gratuite dès 100€</li>
              <li>Protection acheteur garantie</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SurvivalGear. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
