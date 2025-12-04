export default function MentionsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <p>
              <strong>SurvivalGear</strong><br />
              Site e-commerce de matériel outdoor et survie<br />
              Email: contact@survivalgear.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <p>
              Le site est hébergé par Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              États-Unis
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit 
              d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Données personnelles</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de 
              suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à 
              privacy@survivalgear.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez 
              refuser l'utilisation des cookies via les paramètres de votre navigateur.
            </p>
          </section>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p>Dernière mise à jour: Décembre 2024</p>
        </div>
      </div>
    </div>
  );
}
