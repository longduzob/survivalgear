export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politique de Retour</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Délai de rétractation</h2>
            <p>
              Conformément à la législation européenne, vous disposez d'un délai de <strong>14 jours</strong> 
              à compter de la réception de votre colis pour exercer votre droit de rétractation, 
              sans avoir à justifier de motifs ni à payer de pénalité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Conditions de retour</h2>
            <p>Pour être accepté, un retour doit respecter les conditions suivantes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Le produit doit être retourné dans son emballage d'origine</li>
              <li>Le produit ne doit pas avoir été utilisé</li>
              <li>Tous les accessoires et documents doivent être présents</li>
              <li>Le produit ne doit présenter aucun signe d'usure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Procédure de retour</h2>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li>Contactez notre service client à: returns@survivalgear.com</li>
              <li>Indiquez votre numéro de commande et le motif du retour</li>
              <li>Nous vous enverrons une étiquette de retour prépayée</li>
              <li>Renvoyez le colis à l'adresse indiquée</li>
              <li>Vous serez remboursé sous 14 jours après réception du retour</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Frais de retour</h2>
            <p>
              Les frais de retour sont à la charge du client, sauf en cas de produit défectueux 
              ou d'erreur de notre part. Dans ces cas, nous prenons en charge l'intégralité des 
              frais de retour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Remboursement</h2>
            <p>
              Le remboursement sera effectué par le même moyen de paiement que celui utilisé lors 
              de l'achat, dans un délai de 14 jours suivant la réception du produit retourné.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Échange</h2>
            <p>
              Si vous souhaitez échanger un produit (taille, couleur), contactez-nous à 
              exchanges@survivalgear.com. Nous traiterons votre demande dans les plus brefs délais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Produits défectueux</h2>
            <p>
              En cas de produit défectueux, contactez-nous immédiatement avec des photos du défaut. 
              Nous procéderons à un échange ou un remboursement complet, frais de port inclus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>
              Pour toute question concernant les retours:<br />
              Email: returns@survivalgear.com<br />
              Délai de réponse: 24-48 heures
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
