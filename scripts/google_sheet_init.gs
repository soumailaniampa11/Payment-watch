/**
 * VEILLE STRATÉGIQUE — Paiement Maroc
 * Google Apps Script — Initialisation du Google Sheet
 *
 * INSTRUCTIONS:
 * 1. Ouvrir https://script.google.com
 * 2. Créer un nouveau projet, coller ce code
 * 3. Cliquer sur "Exécuter" → initVeilleSheet()
 * 4. Autoriser les permissions
 * 5. Récupérer l'ID du Spreadsheet dans les logs (View > Logs)
 * 6. Coller cet ID dans les workflows n8n
 */

function initVeilleSheet() {
  const ss = SpreadsheetApp.create('Veille Stratégique — Paiement Maroc');
  const ssId = ss.getId();

  // =========================================================
  // FEUILLE 1 : VEILLE (données principales)
  // =========================================================
  const veille = ss.getSheets()[0];
  veille.setName('Veille');

  const headers = [
    'Date de collecte',
    'Titre',
    'Source',
    'Lien',
    'Date publication',
    'Résumé',
    'Catégorie',
    'Sous-catégorie',
    'Type de signal',
    'Acteurs cités',
    'Banque concurrente',
    'Importance',
    'Opportunité',
    'Menace',
    'Impact pour AWB',
    'Action recommandée',
    'Pertinent',
    'Statut'
  ];

  veille.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style header — banque professionnelle
  const hdr = veille.getRange(1, 1, 1, headers.length);
  hdr.setBackground('#1B3A6B')
     .setFontColor('#FFFFFF')
     .setFontWeight('bold')
     .setFontSize(10)
     .setHorizontalAlignment('center')
     .setVerticalAlignment('middle')
     .setBorder(false, false, true, false, false, false, '#C9AA71', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  veille.setFrozenRows(1);
  veille.setRowHeight(1, 36);

  // Largeurs des colonnes
  const widths = [130, 320, 120, 220, 120, 420, 150, 160, 160, 200, 160, 85, 260, 260, 320, 260, 75, 110];
  widths.forEach((w, i) => veille.setColumnWidth(i + 1, w));

  // Validation — Importance
  const impRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Faible', 'Moyenne', 'Élevée'], true).build();
  veille.getRange('L2:L3000').setDataValidation(impRule);

  // Validation — Statut
  const statRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Nouveau', 'Lu', 'En cours', 'Traité', 'Archivé'], true).build();
  veille.getRange('R2:R3000').setDataValidation(statRule);

  // Validation — Catégorie
  const catRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      'Paiement multicanal', 'Banque concurrente', 'Fintech',
      'Régulation', 'Gouvernement/Secteur public', 'Innovation',
      'Partenariat', 'Nouveau produit/service', 'Autre'
    ], true).build();
  veille.getRange('G2:G3000').setDataValidation(catRule);

  // Mise en forme conditionnelle — Importance
  const impRange = veille.getRange('L2:L3000');
  const rules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Élevée')
      .setBackground('#C0392B').setFontColor('#FFFFFF').setRanges([impRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Moyenne')
      .setBackground('#E67E22').setFontColor('#FFFFFF').setRanges([impRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Faible')
      .setBackground('#27AE60').setFontColor('#FFFFFF').setRanges([impRange]).build()
  ];
  veille.setConditionalFormatRules(rules);

  // Alternance de couleur sur les lignes de données
  const dataRange = veille.getRange('A2:R3000');
  const altRules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=MOD(ROW(),2)=0')
      .setBackground('#EBF0FA')
      .setRanges([dataRange]).build()
  ];
  veille.setConditionalFormatRules(veille.getConditionalFormatRules().concat(altRules));

  // Wrap text sur colonnes longues
  ['F', 'M', 'N', 'O', 'P'].forEach(col => {
    veille.getRange(`${col}2:${col}3000`).setWrap(true);
  });
  veille.getRange('B2:B3000').setWrap(true);

  // =========================================================
  // FEUILLE 2 : DIGEST (résumés quotidiens)
  // =========================================================
  const digest = ss.insertSheet('Digest');
  const dHeaders = ['Date', 'Nb articles', 'Top Opportunités', 'Top Menaces', 'Top Initiatives concurrentes', 'Statut envoi'];
  digest.getRange(1, 1, 1, dHeaders.length).setValues([dHeaders]);
  digest.getRange(1, 1, 1, dHeaders.length)
    .setBackground('#1B3A6B').setFontColor('#FFFFFF')
    .setFontWeight('bold').setHorizontalAlignment('center');
  digest.setFrozenRows(1);
  [100, 80, 400, 400, 400, 120].forEach((w, i) => digest.setColumnWidth(i + 1, w));

  // =========================================================
  // FEUILLE 3 : SOURCES (liste des sources RSS)
  // =========================================================
  const sources = ss.insertSheet('Sources');
  const sHeaders = ['Nom', 'URL RSS', 'Catégorie', 'Actif', 'Priorité', 'Notes'];
  sources.getRange(1, 1, 1, sHeaders.length).setValues([sHeaders]);
  sources.getRange(1, 1, 1, sHeaders.length)
    .setBackground('#1B3A6B').setFontColor('#FFFFFF')
    .setFontWeight('bold').setHorizontalAlignment('center');
  sources.setFrozenRows(1);

  const srcData = [
    ["Médias24",             "https://medias24.com/feed",                    "Actualités Maroc",   "OUI", "Haute",   "Actualités économiques marocaines"],
    ["L'Economiste",         "https://www.leconomiste.com/feed",             "Économie Maroc",     "OUI", "Haute",   "Presse économique de référence"],
    ["Finances News",        "https://www.financesnews.ma/feed",             "Finance Maroc",      "OUI", "Haute",   "Finance, marchés, banques"],
    ["Challenge.ma",         "https://www.challenge.ma/feed",                "Business Maroc",     "OUI", "Haute",   "Business et entreprises Maroc"],
    ["Telquel",              "https://telquel.ma/feed",                      "Actualités Maroc",   "OUI", "Moyenne", "Actualités générales Maroc"],
    ["La Nouvelle Tribune",  "https://lanouvelletribune.info/feed",          "Économie Maroc",     "OUI", "Moyenne", "Tribune économique"],
    ["Le Desk",              "https://www.ledesk.ma/feeds/",                 "Actualités Maroc",   "OUI", "Moyenne", "Investigation et économie"],
    ["TechCabal",            "https://techcabal.com/feed/",                  "Fintech Afrique",    "OUI", "Haute",   "Fintech africaine de référence"],
    ["Fintech News Africa",  "https://fintechnews.africa/feed/",             "Fintech Afrique",    "OUI", "Haute",   "Actualités fintech africaines"],
    ["The Paypers",          "https://thepaypers.com/rss/all",               "Paiement Global",    "OUI", "Haute",   "Paiement international"],
    ["Wamda",                "https://wamda.com/feed",                       "Startup MENA",       "OUI", "Moyenne", "Startup & innovation MENA"],
    ["PYMNTS",               "https://www.pymnts.com/feed/",                 "Paiement Global",    "OUI", "Moyenne", "Paiement et fintech global"],
    ["Africanews Business",  "https://fr.africanews.com/feed/rss",           "Actualités Afrique", "OUI", "Faible",  "Actualités Afrique générale"],
  ];
  sources.getRange(2, 1, srcData.length, 6).setValues(srcData);
  [160, 320, 160, 60, 80, 280].forEach((w, i) => sources.setColumnWidth(i + 1, w));

  // Colorer les priorités dans Sources
  const prioRange = sources.getRange('E2:E100');
  const prioRules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Haute')
      .setBackground('#C0392B').setFontColor('#FFFFFF').setRanges([prioRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Moyenne')
      .setBackground('#E67E22').setFontColor('#FFFFFF').setRanges([prioRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Faible')
      .setBackground('#27AE60').setFontColor('#FFFFFF').setRanges([prioRange]).build()
  ];
  sources.setConditionalFormatRules(prioRules);

  // =========================================================
  // LOG FINAL
  // =========================================================
  Logger.log('===========================================');
  Logger.log('✅ GOOGLE SHEET CRÉÉ AVEC SUCCÈS');
  Logger.log('===========================================');
  Logger.log('Nom        : Veille Stratégique — Paiement Maroc');
  Logger.log('ID Sheet   : ' + ssId);
  Logger.log('URL        : ' + ss.getUrl());
  Logger.log('-------------------------------------------');
  Logger.log('👉 COPIEZ cet ID dans vos workflows n8n :');
  Logger.log('   SPREADSHEET_ID = ' + ssId);
  Logger.log('===========================================');

}

// =========================================================
// Renommer le sheet existant (exécuter une seule fois)
// =========================================================
function renameExistingSheet() {
  const ss = SpreadsheetApp.openById('1IwRCifPZDGri5kenhkcuPgcQMg6OVZTnjCQhsnUdD5w');
  ss.rename('Veille Stratégique — Paiement Maroc');
  Logger.log('✅ Sheet renommé : ' + ss.getName());
}
