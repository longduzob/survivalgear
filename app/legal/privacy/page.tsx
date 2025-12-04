export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Protection de vos données</h2>
            <p>
              Conformément au RGPD, nous nous engageons à protéger vos données personnelles et à 
              respecter votre vie privée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Données collectées</h2>
            <p>Nous collectons les données suivantes:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Adresse de livraison</li>
              <li>Numéro de téléphone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Utilisation des données</h2>
            <p>
              Vos données sont utilisées uniquement pour traiter vos commandes et améliorer votre 
              expérience sur notre site. Elles ne seront jamais vendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
            <p>
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              Pour exercer ces droits, contactez-nous à: privacy@survivalgear.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
