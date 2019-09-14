(function ($) {
  'use strict';
  
  /* ---------- padstart ie11 support starts ---------- */
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
      targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ' '));
      if (this.length > targetLength) {
        return String(this);
      }
      else {
        targetLength = targetLength-this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0,targetLength) + String(this);
      }
    };
  }
  /* ---------- padstart ie11 support ends ---------- */
  
  /* ---------- repeat ie11 support starts ---------- */
  if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      'use strict';
      if (this == null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
      }
      var str = '' + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
      }
      if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return '';
      }
      // Ensuring count is a 31-bit integer allows us to heavily optimize the
      // main part. But anyway, most current (August 2014) browsers can't handle
      // strings 1 << 28 chars or longer, so:
      if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
      }
      var maxCount = str.length * count;
      count = Math.floor(Math.log(count) / Math.log(2));
      while (count) {
        str += str;
        count--;
      }
      str += str.substring(0, maxCount - str.length);
      return str;
    }
  }
  /* ---------- repeat ie11 support ends ---------- */  
  
  var callFlag = 0;
  
  /* ---------- tipue content starts ---------- */
  var tipuesearch = {"pages": [
    { 
      "title": "Spalt Forte", 
      "text": "Spalt Forte enthält den bewährten Wirkstoff Ibuprofen. Erstmals ist es gelungen, den gut erforschten und sicheren Wirkstoff in vollständig gelöster Form zur schnellen Einnahme in eine kleine leicht zu schluckende Flüssigkapseln einzuschließen. Diese patentierte Neuentwicklung steht für eine leichte Einnahme und einen schnellen Wirkungseintritt. Spalt Forte lindert so schnell in wenigen Minuten den Schmerz. Starke Wirkung durch Ibuprofen und gute Verträglichkeit. Flüssigkapseln  gegen Schmerzen mit flüssigem Wirkstoff:Durch innovative Darreichungsform leicht einzunehmen, schnell wirksam und geschmacksneutral. Moderner Wirkstoff Ibuprofen: Starke Wirkung bei guter Verträglichkeit. Doppelte Power: 400 mg Wirkstoff für die optimale Dosierung bei Schmerzen. Vielseitige Verwendung: Wirksam bei vielen Schmerzarten wie Kopfschmerzen-, Zahn- und Regelschmerzen. Packungsgrößen: 10, 20, 50 Weichkapseln PZN: 00791674, 00793839, 00796499", 
      "img": "/images/product/spalt-forte.png", 
      "tags": "Forte produkte products 00791674 00793839 00796499", 
      "url": "/produkte/spalt-forte.html"
    },
    {
      "title": "Spalt Migrane", 
      "text": "Spalt Migräne enthält den bewährten Wirkstoff Ibuprofen. Erstmals ist es gelungen, den gut erforschten und sicheren Wirkstoff in vollständig gelöster Form zur schnellen Einnahme in eine kleine leicht zu schluckende Flüssigkapseln einzuschließen. Diese patentierte Neuentwicklung steht für eine leichte Einnahme und einen schnellen Wirkungseintritt. Spalt Migräne lindert so schnell die Migräne. Die Flüssigkapseln gegen Migräne Leichte Einnahmen: Die kompakte Gelkapsel ist durch die glatte Oberfläche leicht einzunehmen auch bei migränebedingter Übelkeit.​ Starkes Ergebnis: Der Wirkstoff Ibuprofen ist wirksam gegen Migräne bei guter Verträglichkeit.​ Flüssiger Wirkstoff: Die innovative Darreichungsform gewährleistet die schnelle Aufnahme trotz verlangsamter Magen -Darm -Passage. Packungsgrößen: 10, 20 Weichkapseln PZN: 00806571, 00808044​​", 
      "img": "/images/product/spalt-migrane.png", 
      "tags": "Migrane produkte products 00806571 00808044​​", 
      "url": "/produkte/spalt-migrane.html"
    },
    {
      "title": "Spalt Mobil", 
      "text": "Was ist das Besondere an Spalt Mobil? Die Flüssigkapsel enthält in ihrem Inneren den Wirkstoff Ibuprofen, der bereits vollständig gelöst ist. Mit 400 mg Ibuprofen handelt es sich um die maximale Einzeldosis, die ohne Rezept erhältlich ist. Spalt Mobil wird bei bekannter Arthrose eingesetzt, das heißt, wenn der Arzt einen Gelenkverschleiß festgestellt hat. Flüssigkapseln gegen Gelenkschmerz bei Arthrose Vorteile von Spalt Mobil auf einen Blick: Wirkt schnell und lange. Ist stark, sicher und gut verträglich. Flüssiger Wirkstoff: Zur Behandlung leichter bis mäßig starker Schmerzen bei bekannter Arthrose (Gelenkverschleiß).Packungsgrößen: 20, 50 Weichkapseln PZN: 00128533, 00128556​​", 
      "img": "/images/product/spalt-mobil.png", 
      "tags": "Mobil produkte products 00128533 00128556​​", 
      "url": "/produkte/spalt-mobil.html"
    },
    {
      "title": "Spalt Kopfschmerz​", 
      "text": "Spalt Kopfschmerz enthält den bewährten Wirkstoff Ibuprofen. Erstmals ist es gelungen den gut erforschten und sicheren Wirkstoff in vollständig gelöster Form in eine kleine, leicht zu schluckende Flüssigkapsel einzuschließen. Diese patentierte Neuentwicklung steht für eine leichte Einnahme und einen schnellen Wirkungseintritt. Spalt Kopfschmerz Flüssigkapseln lindern so in wenigen Minuten den Schmerz. Machen Sie den Geschwindigkeitsvergleich. Flüssigkapseln gegen Kopfschmerz Flüssigkapseln mit vollständig gelöstem Wirkstoff: Durch innovative Darreichungsform leicht einzunehmen, schnell wirksam und geschmacksneutral. Moderner Wirkstoff Ibuprofen:​ Zuverlässige Wirkung bei guter Verträglichkeit. Die kleine Spalt Kopfschmerz: 200 mg Wirkstoff für die genaue Dosierung – auch bei leichten Schmerzen. Packungsgrößen: 10, 20, 50 Weichkapseln PZN: 00659934 , 00659940, 00659957​​", 
      "img": "/images/product/spalt-kopfschmerz.png", 
      "tags": "Kopfschmerz​ produkte products 00659934 00659940 00659957​​", 
      "url": "/produkte/spalt-kopfschmerz.html"
    },
    {
      "title": "Spalt Grippal", 
      "text": "Bei einem akuten grippalen Infekt oder Schnupfen treten mehrere Erkältungssymptome oft zeitgleich auf. Dafür gibt es von Spalt die einfache Lösung: Spalt Grippal Tabletten. Die rezeptfreie Wirkstoffkombination bei Erkältung Bekämpft viele der typischen Erkältungsbeschwerden: Verstopfte Nase und Nebenhöhlen, verbunden mit Kopf-, Hals- und Gliederschmerzen sowie Fieber. Effektive Wirkstoff-Kombination aus Ibuprofen und Pseudoephedrin: Ibuprofen lindert den Schmerz, senkt das Fieber und hemmt die Entzündung. Pseudoephedrin lindert den Schnupfen und lässt die Schleimhaut abschwellen. Packungsgrößen: 20 überzogene Tabletten, 20 Weichkapseln PZN: 10327653, 12646919", 
      "img": "/images/product/spalt-grippal.png", 
      "tags": "Grippal produkte products 10327653 12646919", 
      "url": "/produkte/spalt-grippal.html"
    },
    {
      "title": "Spalt Schmerztabletten", 
      "text": "Spalt Schmerztabletten enthalten die Wirkstoffe Acetylsalicylsäure und Paracetamol. Beide Stoffe sind zwar auch als Einzelstoffe wirksame Schmerzmittel, zusammen kombiniert ist die schmerzstillende Wirkung aber stärker als nach Einnahme des jeweiligen Einzelwirkstoffs. Dies wird wahrscheinlich durch unterschiedliche Angriffspunkte der Wirkstoffe vermittelt. Während bei ASS eine Wirkung direkt am Ort des jeweiligen Schmerzgeschehens (peripheres Gewebe) im Vordergrund steht, bekämpft Paracetamol den Schmerz eher direkt im Gehirn (zentrale Wirkung). Darüber hinaus wird das Risiko von Nebenwirkungen durch die herabgesetzte Menge der Einzelsubstanzen deutlich vermindert.​​ Der Klassiker gegen Schmerzen Sinnvolle Kombination: Mit ASS und Paracetamol wurden zwei bewährte Schmerzmittel miteinander kombiniert. Verstärkte Wirksamkeit: Die schmerzstillende Wirkung ist stärker als nach Einnahme der Einzelsubstanzen. Verbesserte Verträglichkeit: Die Nebenwirkungen sind durch die herabgesetzte Menge der Einzelsubstanzen vermindert. Packungsgrößen: 10, 20, 30 Tabletten PZN: 08689828, 08689834, 01743393", 
      "img": "/images/product/spalt-schmerztab.png", 
      "tags": "Schmerztabletten produkte products 08689828 08689834 01743393", 
      "url": "/produkte/spalt-schmerztabletten.html"
    },
    {
      "title": "Spalt Plus Coffein N", 
      "text": "Spalt plus Coffein N enthält die bewährten Wirkstoffe Acetylsalicylsäure und Paracetamol, die auch in der Spalt Schmerztablette zu finden sind. Zusätzlich wurde noch der Wirkstoff Coffein hinzugefügt. Coffein verstärkt die Wirksamkeit von Acetylsalicylsäure und Paracetamol und verkürzt darüber hinaus den Wirkungseintritt. Die Wirkstoffkombination in Spalt plus Coffein N Schmerztabletten wurde von der Deutschen Migräne und Kopfschmerzgesellschaft (DMKG) als Mittel der 1. Wahl, z.B. bei Spannungskopfschmerz, empfohlen. Das starke Wirkstoff-Trio Starkes Trio: Die bewährte Kombination von ASS und Paracetamol wurde hier durch den Beschleuniger Coffein ergänzt. Schneller Wirkeintritt: Die Zeit bis zum Eintritt der Wirkung wird durch das Coffein deutlich verkürzt. Starke Empfehlung: Die Kombination wird von der Deutschen Migräne und Kopfschmerzgesellschaft als Mittel der 1. Wahl bei Migräne und Spannungskopfschmerz empfohlen. Packungsgrößen: 20 Tabletten PZN: 01819239​​", 
      "img": "/images/product/spalt-plus-coffein.png", 
      "tags": "Coffein produkte products 01819239​​", 
      "url": "/produkte/spalt-plus-coffein-n.html"
    },
    {
      "title": "Doppel Spalt Compact", 
      "text": "ASS beweist seit Jahrzehnten seine gute Wirksamkeit und Verträglichkeit. Doppel Spalt Compact enthält den bewährten Wirkstoff Acetysalicylsäure in einer höheren Dosierung und Coffein. Doppel Spalt Compact Tabletten werden angewandt gegen leichte bis mäßig starke Schmerzen und Fieber. Die schnelle und vielseitige Tablette Bewährter Wirkstoff: ASS beweist seit Jahrzehnten seine gute Wirksamkeit und Verträglichkeit. Sinnvoller Begleiter: Coffein verstärkt die Wirkung von ASS und beschleunigt darüber hinaus den Wirkungseintritt. Packungsgrößen: 20 Tabletten PZN: 07135335​", 
      "img": "/images/product/doppel-spalt.png", 
      "tags": "Doppel produkte products 07135335​", 
      "url": "/produkte/doppel-spalt-compact.html"
    },
    {
      "title": "Schmerzarten", 
      "text": "Die Hälfte aller Deutschen leidet regelmäßig unter Schmerzen. Hier erfahren Sie, welche Schmerzarten es gibt.​​", "tags": "Schmerzarten", 
      "url": "/informationen/schmerzarten.html"
    },
    {
      "title": "Schmerzen - ein Warnsignal des Körpers", 
      "text": "Schmerzen sind ein wichtiges Warnsignal des Körpers. Werden Schmerzen zu lange ignoriert, können sie sich in das Schmerzgedächtnis einbrennen - und schlimmstenfalls chronisch werden. Die Behandlung von Schmerzen richtet sich nach der Art, aber auch der Intensität und Dauer des Schmerzes. Sehr starke oder plötzlich auftretende Schmerzen, solche, die mehrere Tage andauern oder deren Ursache nicht eindeutig ist, müssen von einem Arzt untersucht werden.​ Schmerzen sind laut Lehrbuch eine komplexe, unangenehme Sinnesempfindung. Wer Schmerzen hat, wird den Begriff unangenehm möglicherweise als untertrieben empfinden. Schmerzen können uns, unsere Leistungsfähigkeit und unsere Lebensqualität extrem beeinflussen.​ Trotzdem sind Schmerzen nicht grundsätzlich schlecht: Denn sie sind auch ein Warnsignal unseres Körpers. Sie zeigen uns die Grenzen unserer körperlichen Belastbarkeit und können ein Hinweis auf ernste Krankheiten sein.​ Wird unser Nervensystem jedoch ständig von Schmerzreizen überflutet, können Schmerzempfindungen dauerhaft werden. Der Patient leidet Schmerzen, ohne dass es eine körperliche Ursache gibt, weil die Schwelle für eine Schmerzempfindung herab gesetzt ist. In solchen Fällen spricht man von Chronifizierung des Schmerzes, und der Schmerz selbst wird zur Krankheit.​ Bei der Bekämpfung von Schmerzen gilt es also, das richtige Maß zu finden: einerseits müssen Schmerzen sorgfältig diagnostiziert werden. Es kann gefährlich sein Schmerzen, die heftig oder häufig auftreten, einfach zu ignorieren oder ohne ärztliche Untersuchung dauerhaft zu betäuben. Andererseits sollte man mit der Behandlung von Schmerzen nicht zu lange warten. Gerade akute, kurzzeitig auftretende Schmerzen, deren Ursache bekannt und vorübergehend ist, z.B.: Zahn- oder Regelschmerzen eignen sich zur Selbstmedikation. Die richtige Behandlung hängt dabei von der Art der Schmerzen ab.​​​", 
      "tags": "schmerzen warnsignal korpers", 
      "url": "/informationen/schmerzarten.html#schmerzen"
    },
    {
      "title": "Kopfschmerzen", 
      "text": "Es gibt viele verschiedene Kopfschmerzarten.Spannungskopfschmerz und Migräne sind mit über 90% die häufigsten Kopfschmerzformen.Für die Behandlung ist es wichtig, zwischen Migräne und Spannungskopfschmerz zu unterscheiden.​​​", "tags": "kopfschmerzen", 
      "url": "/informationen/schmerzarten.html#kopfschmerzen"
    },
    {
      "title": "Spannungskopfschmerz", 
      "text": "Spannungskopfschmerz ist meist beidseitig und verstärkt sich nicht bei körperlicher Anstrengung. Gelegentlich auftretende Spannungskopfschmerzen eignen sich meist gut für die Selbstmedikation. Spannungskopfschmerzen sind meist beidseitig, drückend oder ziehend. Im Unterschied zur Migräne verstärken sie sich nicht bei körperlicher Anstrengung (also z.B. beim Treppen steigen). Spannungskopfschmerzen können vom Nacken in den Kopf ausstrahlen, an den Schläfen oder auch der Stirn beginnen. Viele Betroffene beschreiben ihren Schmerz, *als wenn der Kopf in einem Schraubstock stecken würde*. Spannungskopfschmerzen können unbehandelt mehrere Tage anhalten. Begleitend zur Therapie mit Schmerzmitteln kann bei Spannungskopfschmerzen helfen: Wärme, um Verspannungen zu lösen Ablenkung, z.B. ein Spaziergang Ein Schmerztagebuch, um mögliche Auslöser zu identifizieren", 
      "tags": "spannungskopfschmerz", 
      "url": "/informationen/schmerzarten.html#spannungskopfschmerz"
    },
    {
      "title": "Migräne", 
      "text": "Migränepatienten leiden in der Regel nicht nur unter Kopfschmerzen, sondern unter weiteren Symptomen wie Übelkeit und Erbrechen. Die Kopfschmerzen selbst sind meist einseitig und pulsierend. Je nach Intensität und Häufigkeit kann es sinnvoll sein, die Diagnose von einem Arzt absichern zu lassen und eine geeignete Behandlungfsorm zu besprechen. Migräne sind Kopfschmerzen, die in Attacken plötzlich auftreten. Sie werden als pulsierend, pochend oder hämmernd beschrieben und nehmen bei körperlicher Anstrengung zu. Migräneschmerzen sind häufig einseitig und können sehr heftig sein. Sie beginnen meist in der Schläfe oder rund um ein Auge und breiten sich dann aus. Begleitend zu einer Migräneattacke leiden viele Betroffene unter Übelkeit bis zum Erbrechen, sowie extremer Licht- und Lärmempfindlichkeit. Einige Patienten erleben im Vorfeld der Migräneattacke eine Aura: Bevor die Kopfschmerzen auftreten haben sie neurologische Ausfallerscheinungen wie z.B. Sehstörungen, Lichtblitze, Sprachstörungen, Schwindelgefühle und Gleichgewichtsprobleme. Während die Symptome der Aura bei den meisten Patienten maximal zwei Stunden anhalten, kann eine Migräneattacke bis zu vier Tage dauern und den Betroffenen komplett außer Gefecht setzen. Wird die Migräne bereits während der Auraphase behandelt, kann dies die Attacke verkürzen oder sogar unterdrücken. Neben der medikamentösen Therapie kann bei Migräne helfen: Dem Körper Ruhe gönnen Den Raum abdunkeln Ein Schmerztagebuch führen, um mögliche Auslöser zu identifizieren", 
      "tags": "Migräne migrane", 
      "url": "/informationen/schmerzarten.html#migrane"
    },
    {
      "title": "Zahnschmerzen", 
      "text": "Bei akuten Zahnschmerzen helfen antientzündliche Schmerzmittel wie z.B. Ibuprofen.Mit Zahnschmerzen muss man umgehend zum Zahnarzt. Bei Zahnschmerzen handelt es sich meist um Entzündungen, z.B. weil Kariesbakterien die Schutzschichten eines Zahnes zerstört haben. Akute Zahnschmerzen können sehr plötzlich (z.B. nachts) auftreten und sehr heftig sein. Ein antientzündliches Schmerzmittel leistet dann rasch erste Hilfe. Den Gang zum Zahnarzt erspart das natürlich nicht. Entzündungen von Zähnen und Zahnfleisch müssen in jedem Fall behandelt werden. Auch nach dem Zahnarztbesuch, z.B. nach dem Entfernen von Weisheitszähnen oder ähnlichen Eingriffen hilft ein schnell wirksames Schmerzmittel mit entzündungshemmenden Eigenschaften, z.B. Flüssigkapseln mit Ibuprofen. Neben Schmerzmitteln können bei Zahnschmerzen helfen: Kühlung, z.B. mit einer umwickelten Kompresse von außen Entzündete Stellen unbedingt peinlich sauber halten", 
      "tags": "zahnschmerzen", 
      "url": "/informationen/schmerzarten.html#zahnschmerzen"
    },
    {
      "title": "Regelschmerzen", 
      "text": "Regelschmerzen kehren immer wieder und brauchen daher eine wirksame, aber schonende Behandlung. Der Alltag sollte nicht unter Regelschmerzen leiden. Leichte Regelschmerzen lassen sich oft ohne Schmerzmittel, z.B. mit einem krampflösenden Wärmepflaster behandeln. Wenn sich die Unterbauchbeschwerden allerdings zu regelrechten Bauchkrämpfen ausweiten, kann ein Schmerzmittel helfen, den Alltag zu überstehen. Denn Schule, Arbeit oder Sport sollten nicht regelmäßig unter Menstruationsbeschwerden zu leiden haben. Neben einem sanften Schmerzmittel können bei Regelschmerzen helfen: Wärme im Unterbauch-Bereich, um die Krämpfe zu lösen. Verzicht auf blähende Speisen während der schlimmsten Tage.​", 
      "tags": "Regelschmerzen", 
      "url": "/informationen/schmerzarten.html#regelschmerzen"
    },
    {
      "title": "Muskel-, Glieder- und Gelenkschmerzen", 
      "text": "Gelenkschmerzen in Folge von Unfällen sollten ggf. ärztlich untersucht und das Gelenk geschont werden. Rücken- oder Gelenkschmerzen in Folge von Fehlbelastungen darf nicht zur Bewegungseinschränkung der entsprechenden Gliedmaßen führen, weil sich die Beschwerden sonst verschlimmern. Prinzipiell stehen bei Glieder und Gelenkschmerzen orale Schmerzmittel (zur Einnahme) oder topische Schmerzmittel (zum Auftragen auf die Haut) zur Verfügung. Muskel-Glieder- und Gelenkschmerzen können ganz unterschiedliche Ursachen haben. Akute Gliederschmerzen treten z.B. im Rahmen einer Erkältung auf. Akute Muskel und Gelenkschmerzen sind häufig die Folge von sportlicher Überlastung oder Unfällen. In beiden Fällen sollte man die betroffenen Körperteile eine Weile schonen. Aber auch durch Fehlbelastungen z.B. am Arbeitsplatz können Verspannungen und sogar Abnutzungserscheinungen an den Gelenken hervorrufen und Schmerzen verursachen. Schlimmstenfalls entwickelt sich eine Arthrose, eine Verschleißerscheinung der Gelenke. Hier ist es besonders wichtig, Schmerzen effektiv zu behandeln: Schonhaltung oder mangelnde Bewegung verschlimmern solche Beschwerden nämlich, anstatt sie zu bessern. Es ist wichtig, die entsprechenden Muskelpartien zu erhalten und zu trainieren, um die Gelenke zu entlasten. Eine effektive Schmerzbekämpfung ist hier oft der erste Schritt, damit der Patient beweglich bleibt. Chronische entzündliche Gelenkschmerzen, z.B. aufgrund von Rheuma gehören dagegen in ärztliche Behandlung.", 
      "tags": "Muskel Glieder Gelenkschmerzen", 
      "url": "/informationen/schmerzarten.html#muskel"
    },
    {
      "title": "Wirkstoffe", 
      "text": "wirkstoffe", 
      "tags": "wirkstoffe", 
      "url": "/informationen/wirkstoffe.html"
    },
    {
      "title": "Ibuprofen", 
      "text": "Wirkstoff, der rezeptfrei erhältlich ist Wirkt schmerzstillend, sehr gut antientzündlich und fiebersenkend Verlangsamt schwach die Blutgerinnung Einzeldosis: 200-400 mg Tageshöchstdosis: 1200 mg", 
      "tags": "ibuprofen wirkstoffe", 
      "url": "/informationen/wirkstoffe.html#ibuprofen"
    },
    {
      "title": "Paracetamol", 
      "text": "Wirkt schmerzstillend und fiebersenkend, aber kaum antientzündlich Ohne Einfluss auf die Blutgerinnung Einzeldosis 500-1000 mg Tageshöchstdosis: 4000 mg Kann in hohen Dosierungen Leberschäden verursachen", 
      "tags": "paracetamol wirkstoffe", 
      "url": "/informationen/wirkstoffe.html#paracetamol"
    },
    {
      "title": "Acetylsalicylsäure (ASS)", 
      "text": "Seit über 100 Jahren bekannt Wirkt schmerzstillend, antientzündlich und schwach fiebersenkend Verlangsamt die Blutgerinnung Einzeldosis: 500 mg - 1000 mg Tageshöchstdosis: 3000 mg Kann Magenbeschwerden verursachen Wichtig: nicht bei Kindern einsetzen!", 
      "tags": "acetylsalicylsäure acetylsalicylsaure wirkstoffe", 
      "url": "/informationen/wirkstoffe.html#acetylsalicylsaure"
    },
    {
      "title": "Coffein", 
      "text": "Wirkt in kleinen Dosen anregend Verstärkt die Wirkung von Schmerzmitteln Einzeldosis in Schmerzmitteln: 50 mg Tageshöchstdosis: Ab etwa 500 mg spricht man von Überdosierungen Hohe Dosierungen (ab 1000 mg) können Nebenwirkungen wie Angstgefühle, Schlafstörungen, Bluthochdruck, Magen-Darm-  Beschwerden und Herzrhythmusstörungen auslösen", 
      "tags": "coffein wirkstoffe", 
      "url": "/informationen/wirkstoffe.html#coffein"
    },
    {
      "tags" : "abusus",
      "title" : "Abusus",
      "text" : "Medikamentenmissbrauch. Werden Medikamente eigenverantwortlich entgegen den Einnahmeempfehlungen eingenommen,können sie schädliche Nebenwirkungen haben.",
      "url" : "/informationen/glossar.html#abusus"
    },
    {
      "tags" : "akupunktur",
      "title" : "Akupunktur",
      "text" : "In China entwickeltes Therapieverfahren, das auch zur Schmerzlinderung eingesetzt wird. Ein speziell geschulter Therapeut punktiert mit sehr dünnen Nadeln bestimmte Stellen in der Haut.",
      "url" : "/informationen/glossar.html#akupunktur"
    },
    {
      "tags" : "akut",
      "title" : "akut",
      "text" : "Plötzlich auftretend",
      "url" : "/informationen/glossar.html#akut"
    },
    {
      "tags" : "alkohol",
      "title" : "Alkohol",
      "text" : "Alkohol entzieht dem Körper Wasser und kann so zur Entstehung von Kopfschmerzen führen (Katerkopfschmerz).",
      "url" : "/informationen/glossar.html#alkohol"
    },
    {
      "tags" : "analgetikum",
      "title" : "Analgetikum",
      "text" : "Schmerzmittel",
      "url" : "/informationen/glossar.html#analgetikum"
    },
    {
      "tags" : "analgesie",
      "title" : "Analgesie",
      "text" : "Aufhebung der Schmerzempfindung, Schmerzlosigkeit",
      "url" : "/informationen/glossar.html#analgesie"
    },
    {
      "tags" : "anamnese",
      "title" : "Anamnese",
      "text" : "Krankengeschichte, Vorgeschichte einer Erkrankung",
      "url" : "/informationen/glossar.html#anamnese"
    },
    {
      "tags" : "antagonist",
      "title" : "Antagonist",
      "text" : "Gegenspieler",
      "url" : "/informationen/glossar.html#antagonist"
    },
    {
      "tags" : "antibabypille",
      "title" : "Antibabypille",
      "text" : "Kann bei einigen Patienten Kopfschmerzen auslösen (Trigger)",
      "url" : "/informationen/glossar.html#antibabypille"
    },
    {
      "tags" : "antirheumatikum",
      "title" : "Antirheumatikum",
      "text" : "Medikamente, die einen dämpfenden Einfluss auf die Entzündung und den Schmerz bei rheumatischen Erkrankungen haben.",
      "url" : "/informationen/glossar.html#antirheumatikum"
    },
    {
      "tags" : "auslosefaktoren",
      "title" : "Auslösefaktoren für Migräne",
      "text" : "Migräne kann durch bestimmte Nahrungsmittel wie Schokolade, Rotwein oder Käse ausgelöst werden. Auch Stress, Zigarettenrauch oder Medikamente können Migräneattacken auslösen.",
      "url" : "/informationen/glossar.html#auslosefaktoren"
    },
    {
      "tags" : "arthritis",
      "title" : "Arthritis",
      "text" : "Gelenkentzündung, entzündliches Rheuma",
      "url" : "/informationen/glossar.html#arthritis"
    },
    {
      "tags" : "arthrose",
      "title" : "Arthrose",
      "text" : "Gelenkverschleiß. Durch Fehl- oder Überbelastung wird die Gelenkschmiere abgenutzt und es kann zur Entzündung der Gelenkinnenhaut kommen. Reiben die Gelenke ungeschützt aufeinander, kommt es zu dauerhaften Schädigungen und Schmerzen.",
      "url" : "/informationen/glossar.html#arthrose"
    },
    {
      "tags" : "ass",
      "title" : "ASS",
      "text" : "Acetylsalicylsäure, schmerzstillender Wirkstoff",
      "url" : "/informationen/glossar.html#ass"
    },
    {
      "tags" : "aura",
      "title" : "Aura",
      "text" : "Neurologische Störung, die etwa 10% der Migränepatienten erleben. Symptome sind Sehstörungen, Schwindel, Sprachstörungen, Kribbeln und Taubheit in den Extremitäten.",
      "url" : "/informationen/glossar.html#aura"
    },
    {
      "tags" : "cluster-kopfschmerz",
      "title" : "Cluster-Kopfschmerz",
      "text" : "Kopfschmerzform, die durch häufige, äußerst heftige Schmerzattacken einseitig um das Auge herum charakterisiert ist.",
      "url" : "/informationen/glossar.html#cluster-kopfschmerz"
    },
    {
      "tags" : "coffein",
      "title" : "Coffein" ,
      "text" : "Wirkstoff, der in Kaffeebohnen vorkommt. Coffein wirkt anregend, gefäßverengend und erhöht die Pulsfrequenz.Weitere Informationen",
      "url" : "/informationen/glossar.html#coffein"
    },
    {
      "tags" : "flussigkapsel",
      "title" : "Flüssigkapsel",
      "text" : "Wird Ibuprofen in herkömmlicher Art und Weise als Tablette oder Dragee angeboten, so bringt das für den Schmerzgeplagten einen entscheidenden Nachteil. Ibuprofen, eine schwache Säure, kann sich im sauren Magensaft nur schlecht lösen. So dauert es sehr lange, bis der Wirkstoff aus der Tablette oder dem Dragee vollständig gelöst ist und in den Dünndarm weitergegeben wird. Denn erst hier kann Ibuprofen in das Blut aufgenommen werden, von wo es zum Ort des Schmerzes transportiert wird. Besser ist ein bereits flüssiger Wirkstoff, der schnell den Magen passiert, sofort in das Blut aufgenommen wird und somit sehr schnell den Schmerz bekämpft. Nun ist es erstmals gelungen, den Wirkstoff Ibuprofen in bereits flüssiger Form in eine Gelkapsel zu bringen. Ein weiterer Vorteil gegenüber herkömmlichen Präparaten ist die geringe Größe, so dass die Kapseln leicht zu schlucken sind. Brausetabletten und bereits fertig zubereitete Lösungen können einen starken Eigengeschmack haben; dem gegenüber zeichnen sich Spalt Flüssigkapseln durch absolute Geschmacksneutralität aus. Unmittelbar nach der Einnahme löst sich die nur 1mm dünne Gelantinehülle im Magen auf und gibt somit den Wirkstoff frei. Bereits 10 Minuten nach der Aufnahme ist dieser Prozess abgeschlossen, d.h. die Kapsel hat sich vollständig aufgelöst. Doch schon viel früher, kurz nach Beginn des Auflösungsprozesses im Magen, kann der Wirkstoff entweichen. Als Flüssigkeit wird er sehr schnell in den Darm weitertransportiert und es beginnt die Aufnahme von Ibuprofen in das Blut. Bereits 10 Minuten nach der Einnahme werden wirksame schmerzlindernde Blutspiegel erreicht.",
      "url" : "/informationen/glossar.html#flussigkapsel"
    },
    {
      "tags" : "fraktur",
      "title" : "Fraktur",
      "text" : "Knochenbruch",
      "url" : "/informationen/glossar.html#fraktur"
    },
    {
      "tags" : "hemikranie",
      "title" : "Hemikranie",
      "text" : "Halbseitiger Kopfschmerz",
      "url" : "/informationen/glossar.html#hemikranie"
    },
    {
      "tags" : "hypothese",
      "title" : "Hypothese",
      "text" : "Wissenschaftliche Vermutung über Zusammenhänge, die bisher nicht bewiesen sind.",
      "url" : "/informationen/glossar.html#hypothese"
    },
    {
      "tags" : "ibuprofen",
      "title" : "Ibuprofen",
      "text" : "Schmerzlinderndes, entzündungshemmendes und fiebersenkendes Medikament. Die höchste Tagesdosis, die ohne Verschreibung eingenommen werden darf, ist 1200 mg.",
      "url" : "/informationen/glossar.html#ibuprofen"
    },
    {
      "tags" : "kater",
      "title" : "Kater",
      "text" : "Nach übermäßigem Alkoholgenuss können Kopfschmerzen auftreten, die Symptome einer leichten Alkoholvergiftung sind. Katerkopfschmerz kann mit Analgetika wie beispielsweise Ibuprofen behandelt werden.",
      "url" : "/informationen/glossar.html#kater"
    },
    {
      "tags" : "koffein",
      "title" : "Koffein",
      "text" : "Wirkstoff, der in Kaffeebohnen vorkommt. Koffein wirkt anregend, gefäßverengend und erhöht die Pulsfrequenz.",
      "url" : "/informationen/glossar.html#koffein"
    },
    {
      "tags" : "kombinationskopfschmerz",
      "title" : "Kombinationskopfschmerz",
      "text" : "Gleichzeitiges Vorkommen von Spannungskopfschmerz und Migräne bei einem Patienten",
      "url" : "/informationen/glossar.html#kombinationskopfschmerz"
    },
    {
      "tags" : "kombinationspraparat",
      "title" : "Kombinationspräparat",
      "text" : "Jedes Medikament, das zwei oder mehr Wirkstoffe enthält",
      "url" : "/informationen/glossar.html#kombinationspraparat"
    },
    {
      "tags" : "kortison",
      "title" : "Kortison",
      "text" : "Hormon der Nebennierenrinde mit vielfältigen Wirkungen im Organismus. Als Medikament zur Entzündungshemmung eingesetzt, aber von starken Nebenwirkungen begleitet.",
      "url" : "/informationen/glossar.html#kortison"
    },
    {
      "tags" : "lokalanasthetikum",
      "title" : "Lokalanästhetikum",
      "text" : "Örtliches Betäubungsmittel",
      "url" : "/informationen/glossar.html#lokalanasthetikum"
    },
    {
      "tags" : "migrane",
      "title" : "Migräne",
      "text" : "Kopfschmerzform, die mit starken, einseitigen Kopfschmerzen einhergeht, die vom Patienten als hämmernd und stechend beschrieben werden. Migräneschmerz verstärkt sich bei körperlicher Anstrengung und wird manchmal von einer Aura begleitet.",
      "url" : "/informationen/glossar.html#migrane"
    },
    {
      "tags" : "monopraparate",
      "title" : "Monopräparate",
      "text" : "Arzneimittel, die nur einen Wirkstoff enthalten",
      "url" : "/informationen/glossar.html#monopraparate"
    },
    {
      "tags" : "naproxen",
      "title" : "Naproxen",
      "text" : "Schmerzmittel mit relativ langsamen Wirkungseintritt",
      "url" : "/informationen/glossar.html#naproxen"
    },
    {
      "tags" : "neurologe",
      "title" : "Neurologe",
      "text" : "Facharzt, der sich mit organischen Erkrankungen des Gehirns und Nervensystems beschäftigt",
      "url" : "/informationen/glossar.html#neurologe"
    },
    {
      "tags" : "neurotransmitter",
      "title" : "Neurotransmitter",
      "text" : "Chemische Botenstoffe, die die Information von einer Nervenzelle auf eine andere übertragen.",
      "url" : "/informationen/glossar.html#neurotransmitter"
    },
    {
      "tags" : "nikotin",
      "title" : "Nikotin",
      "text" : "Faktor, der bei einigen Personen Kopfschmerzen auslösen kann (Trigger)",
      "url" : "/informationen/glossar.html#nikotin"
    },
    {
      "tags" : "ostrogene",
      "title" : "Östrogene",
      "text" : "Weibliche Geschlechtshormone. Schwankungen im Hormonhaushalt können bei einigen Patienten Kopfschmerzen auslösen.",
      "url" : "/informationen/glossar.html#ostrogene"
    },
    {
      "tags" : "paracetamol",
      "title" : "Paracetamol",
      "text" : "Schmerzmittel mit fiebersenkenden Eigenschaften",
      "url" : "/informationen/glossar.html#paracetamol"
    },
    {
      "tags" : "placebo",
      "title" : "Placebo",
      "text" : "Substanz ohne pharmakologische Wirkung. Ein „Scheinmedikament“, welches man in Studien einsetzt, um die tatsächliche Arzneimittelwirkung von psychologischen Effekten durch die Einnahme eines Medikamentes abzugrenzen.",
      "url" : "/informationen/glossar.html#placebo"
    },
    {
      "tags" : "muskelrelaxation",
      "title" : "Progressive Muskelrelaxation",
      "text" : "Therapieverfahren zum Training von körperlicher Entspannung. Entwickelt von dem Amerikaner Jacobson",
      "url" : "/informationen/glossar.html#muskelrelaxation"
    },
    {
      "tags" : "prophylaxe",
      "title" : "Prophylaxe",
      "text" : "Vorbeugung",
      "url" : "/informationen/glossar.html#prophylaxe"
    },
    {
      "tags" : "prostglandine",
      "title" : "Prostglandine",
      "text" : "Körpereigene Botenstoffe mit verschiedenen regulierenden Funktionen, die auch als Schmerzauslöser bei Entzündungen wirken.",
      "url" : "/informationen/glossar.html#prostglandine"
    },
    {
      "tags" : "resorption",
      "title" : "Resorption",
      "text" : "Aufnahme von Wirkstoffen ins Blut",
      "url" : "/informationen/glossar.html#resorption"
    },
    {
      "tags" : "rezeptor",
      "title" : "Rezeptor",
      "text" : "Bindungsstelle, z.B.: für chemische Botenstoffe",
      "url" : "/informationen/glossar.html#rezeptor"
    },
    {
      "tags" : "selbsthilfegruppe",
      "title" : "Selbsthilfegruppe",
      "text" : "Zusammenschluss von Patienten, die sich über ein bestimmtes Krankheitsbild gegenseitig informieren und austauschen, z.B: über Migräne.",
      "url" : "/informationen/glossar.html#selbsthilfegruppe"
    },
    {
      "tags" : "selbstmedikation",
      "title" : "Selbstmedikation",
      "text" : "Behandlung mit Medikamenten durch den Patienten, ohne ärztliche Verschreibung",
      "url" : "/informationen/glossar.html#selbstmedikation"
    },
    {
      "tags" : "schmerzschwelle",
      "title" : "Schmerzschwelle",
      "text" : "Bezeichnung für die Grenze, ab der ein Mensch einen Reiz als Schmerz empfindet.",
      "url" : "/informationen/glossar.html#schmerzschwelle"
    },
    {
      "tags" : "schmerzrezeptoren",
      "title" : "Schmerzrezeptoren",
      "text" : "Nervenenden in der Muskulatur und der Gelenkinnenhaut, die Funktionsstörungen und chemische Reize aufnehmen und zum Gehirn leiten.",
      "url" : "/informationen/glossar.html#schmerzrezeptoren"
    },
    {
      "tags" : "summatriptan",
      "title" : "Summatriptan",
      "text" : "Neuer Wirkstoff aus der Gruppe der Triptane. Diese Medikamente helfen ausschließlich bei ärztlich diagnostizierter Migräne und auch nur, wenn sie zum richtigen Zeitpunkt eingenommen werden.",
      "url" : "/informationen/glossar.html#summatriptan"
    },
    {
      "tags" : "synovia",
      "title" : "Synovia",
      "text" : "Gelenkschmiere, die von der Gelenkinnenhaut gebildet wird.",
      "url" : "/informationen/glossar.html#synovia"
    },
    {
      "tags" : "synovialis",
      "title" : "Synovialis",
      "text" : "Gelenkinnenhaut. Innere Auskleidung der Gelenkkapsel, die die Gelenkschmiere bildet.",
      "url" : "/informationen/glossar.html#synovialis"
    },
    {
      "tags" : "tageshochstdosis",
      "title" : "Tageshöchstdosis",
      "text" : "Die Menge eines Wirkstoffes, die innerhalb von 24 Stunden höchstens eingenommen werden darf. Bei Ibuprofen 1,2g, bei Paracetamol 4g und bei Acetylsalicylsäure 4g",
      "url" : "/informationen/glossar.html#tageshochstdosis"
    },
    {
      "tags" : "trigger",
      "title" : "Trigger",
      "text" : "Auslöser. Triggerfaktoren z.B. für eine Migräne können sein: Nahrungsmittel, Schlafmangel oder Stress",
      "url" : "/informationen/glossar.html#trigger"
    },
    {
      "title": "Kombi-Pflichttext für Laienwerbung", 
      "text": "Spalt Schmerztabletten / Doppel Spalt compact. Für Erwachsene und Jugendliche ab 12 Jahren bei akuten leichten bis mäßig starken Schmerzen. Spalt® plus Coffein N. Für Erwachsene und Jugendliche ab 14 Jahren bei akuten leichten bis mäßig starken Schmerzen. Spalt Mobil. Wirkstoff: Ibuprofen. Zur Behandlung leichter bis mäßig starker Schmerzen bei bekannter Arthrose (Gelenkverschleiß). Spalt® Migräne. Wirkstoff: Ibuprofen. Zur Behandlung der akuten Kopfschmerzphase bei Migräne mit und ohne Aura und zur Behandlung von Spannungskopfschmerzen. Spalt® Kopfschmerz / Spalt Forte. Wirkstoff: Ibuprofen. Bei leichten bis mäßig starken Schmerzen, Fieber. Schmerzmittel sollen längere Zeit oder in höheren Dosen nicht ohne Befragen des Arztes angewendet werden. Zu Risiken und Nebenwirkungen lesen Sie die Packungsbeilage und fragen Sie Ihren Arzt oder Apotheker. [Pfizer Consumer Healthcare, 10922 Berlin] ", 
      "tags": "Pflichttext", 
      "url": "/informationen/pflichtangaben.html"
    }]
  };
  /* ---------- tipue content ends ---------- */
  
  /* ---------- tipue set starts ---------- */
  /*
  Tipue Search 7.0
  Copyright (c) 2018 Tipue
  Tipue Search is released under the MIT License
  http://www.tipue.com/search
  */
  
  
  /*
  Stop words
  Stop words list from http://www.ranks.nl/stopwords
  */
  
  var tipuesearch_stop_words = ["aber","als","am","an","auch","auf","aus","bei","bin","bis","bist","da","dadurch","daher","darum","das","daß","dass","dein","deine","dem","den","der","des","dessen","deshalb","die","dies","dieser","dieses","doch","dort","du","durch","ein","eine","einem","einen","einer","eines","er","es","euer","eure","für","hatte","hatten","hattest","hattet","hier","hinter","ich","ihr","ihre","im","in","ist","ja","jede","jedem","jeden","jeder","jedes","jener","jenes","jetzt","kann","kannst","können","könnt","machen","mein","meine","mit","muß","mußt","musst","müssen","müßt","nach","nachdem","nein","nicht","nun","oder","seid","sein","seine","sich","sie","sind","soll","sollen","sollst","sollt","sonst","soweit","sowie","und","unser","unsere","unter","vom","von","vor","wann","warum","was","weiter","weitere","wenn","wer","werde","werden","werdet","weshalb","wie","wieder","wieso","wir","wird","wirst","wo","woher","wohin","zu","zum","zur","über"];
  
  
  // Word replace
  
  var tipuesearch_replace = {'words': [
    {'word': 'prod', 'replace_with': 'produkte'}]
  };
  
  
  // Weighting
  
  var tipuesearch_weight = {'weight': [
    {'url': '/produkte/spalt-forte.html', 'score': 60},
    {'url': '/produkte/spalt-migrane.html', 'score': 60},
    {'url': '/produkte/spalt-mobil.html', 'score': 60},
    {'url': '/produkte/spalt-kopfschmerz.html', 'score': 60},
    {'url': '/produkte/spalt-grippal.html', 'score': 60},
    {'url': '/produkte/spalt-schmerztabletten.html', 'score': 60},
    {'url': '/produkte/spalt-plus-coffein-n.html', 'score': 60},
    {'url': '/produkte/doppel-spalt-compact.html', 'score': 60},
    {'url': '/informationen/schmerzarten.html', 'score': 30},
    {'url': '/informationen/wirkstoffe.html', 'score': 30},
    {'url': '/informationen/glossar.html', 'score': 30}]
  };
  
  
  // Illogical stemming
  
  var tipuesearch_stem = {'words': [
    {'word': 'migrane', 'stem': 'Migräne'}]
  };
  
  
  // Related
  
  var tipuesearch_related = {'Related': [
    {'search': 'tipue', 'related': 'Search', 'include': 1},
    {'search': 'tipue', 'related': 'jQuery'},
    {'search': 'tipue', 'related': 'Features'},
    {'search': 'tipue', 'related': 'Support'},
    {'search': 'tipue search', 'related': 'Help', 'include': 1},
    {'search': 'tipue search', 'related': 'Support'}]
  };
  
  
  // Internal strings
  
  var tipuesearch_string_1 = 'No title';
  var tipuesearch_string_2 = 'Ergebnisse gefunden für';
  var tipuesearch_string_3 = 'Suchen Sie stattdessen nach';
  var tipuesearch_string_4 = '01 Ergebnis gefunden für';
  var tipuesearch_string_5 = 'Ergebnisse';
  var tipuesearch_string_6 = '<';
  var tipuesearch_string_7 = '>';
  var tipuesearch_string_8 = ''; //Nothing found.
  var tipuesearch_string_9 = ''; //Common words are largely ignored.
  var tipuesearch_string_10 = 'Related';
  var tipuesearch_string_11 = ''; //Search too short. Should be one character or more.
  var tipuesearch_string_12 = ''; //Search too short. Should be
  var tipuesearch_string_13 = ''; //characters or more.
  var tipuesearch_string_14 = 'sekunden';
  var tipuesearch_string_15 = 'Open Image';
  var tipuesearch_string_16 = 'Goto Page';
  
  
  // Internals
  var noResultData = "<p class='tipue-no-search-result-image'><img src='/images/no-search-result.png' alt='' /></p><h2>Keine Einträge gefunden</h2><p>Entschuldigung, aber nichts stimmte mit Ihren Suchbegriffen überein.<br/>Bitte versuchen Sie es erneut mit anderen Schlüsselwörtern.</p>";
  
  // Timer for showTime
  
  var startTimer = new Date().getTime();
  /* ---------- tipue set ends ---------- */
  
  /* ---------- tipue search starts ---------- */
  /*
  Tipue Search 7.0
  Copyright (c) 2018 Tipue
  Tipue Search is released under the MIT License
  http://www.tipue.com/search
  */
  $.fn.tipuesearch = function(options) {
    
    var set = $.extend( {
      
      'contextBuffer'          : 60,
      'contextLength'          : 60,
      'contextStart'           : 90,
      'debug'                  : false,
      'descriptiveWords'       : 25,
      'footerPages'            : 3,
      'highlightTerms'         : true,
      'imageZoom'              : false,
      'minimumLength'          : 3,
      'newWindow'              : false,
      'show'                   : 10,
      'showContext'            : true,
      'showRelated'            : true,
      'showTime'               : true,
      'showTitleCount'         : true,
      'showURL'                : true,
      'wholeWords'             : false
    }, options);
    
    return this.each(function() {
      
      var tipuesearch_t_c = 0;                         
      
      var tipue_search_w = '';
      if (set.newWindow) {
        tipue_search_w = ' target="_blank"';      
      }
      
      function getURLP(name) {
        var locSearch = location.search;
        var splitted = (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(locSearch)||[,""]);
        var searchString = splitted[1].replace(/\+/g, '%20');
        try {
          searchString = decodeURIComponent(searchString);
        } catch(e) {
          searchString = unescape(searchString);
        }
        return searchString || null;
      }
      
      if (getURLP('q')) {
        $('#tipue_search_input').val(getURLP('q'));
        getTipueSearch(0, true);
      }               
      
      $(this).keyup(function(event) {
        if(event.keyCode == '13')
        {
          getTipueSearch(0, true);
        }
      });
      
      
      function getTipueSearch(start, replace) {
        window.scrollTo(0, 0);
        
        var out = '';
        var show_replace = false;
        var show_stop = false;
        var standard = true;
        var c = 0;
        var found = [];
        
        var d_o = $('#tipue_search_input').val();
        d_o = d_o.replace(/\+/g, ' ').replace(/\s\s+/g, ' ');
        
        d_o = $.trim(d_o);
        var d = d_o.toLowerCase();
        
        if ((d.match("^\"") && d.match("\"$")) || (d.match("^'") && d.match("'$"))) {
          standard = false;
        }
        
        var d_w = d.split(' ');
        
        if (standard)
        {
          d = '';
          for (var i = 0; i < d_w.length; i++)
          {
            var a_w = true;
            for (var f = 0; f < tipuesearch_stop_words.length; f++)
            {
              if (d_w[i] == tipuesearch_stop_words[f])
              {
                a_w = false;
                show_stop = true;          
              }
            }
            if (a_w)
            {
              d = d + ' ' + d_w[i];
            }
          }
          d = $.trim(d);
          d_w = d.split(' ');
        }
        else
        {
          d = d.substring(1, d.length - 1);
        }
        
        if (d.length >= set.minimumLength)
        {
          if (standard)
          {
            if (replace)
            {
              var d_r = d;
              for (var i = 0; i < d_w.length; i++)
              {
                for (var f = 0; f < tipuesearch_replace.words.length; f++)
                {
                  if (d_w[i] == tipuesearch_replace.words[f].word)
                  {
                    d = d.replace(d_w[i], tipuesearch_replace.words[f].replace_with);
                    show_replace = true;
                  }
                }
              }
              d_w = d.split(' ');
            }                   
            
            var d_t = d;
            for (var i = 0; i < d_w.length; i++)
            {
              for (var f = 0; f < tipuesearch_stem.words.length; f++)
              {
                if (d_w[i] == tipuesearch_stem.words[f].word)
                {
                  d_t = d_t + ' ' + tipuesearch_stem.words[f].stem;
                }
              }
            }
            d_w = d_t.split(' ');
            
            for (var i = 0; i < tipuesearch.pages.length; i++)
            {
              var score = 0;
              var s_t = tipuesearch.pages[i].text;
              for (var f = 0; f < d_w.length; f++)
              {
                if (set.wholeWords)
                {
                  var pat = new RegExp('\\b' + d_w[f] + '\\b', 'gi');
                }
                else
                {
                  var pat = new RegExp(d_w[f], 'gi');
                }
                if (tipuesearch.pages[i].title.search(pat) != -1)
                {
                  var m_c = tipuesearch.pages[i].title.match(pat).length;
                  score += (20 * m_c);
                }
                if (tipuesearch.pages[i].text.search(pat) != -1)
                {
                  var m_c = tipuesearch.pages[i].text.match(pat).length;
                  score += (20 * m_c);
                }
                if (tipuesearch.pages[i].tags)
                {
                  if (tipuesearch.pages[i].tags.search(pat) != -1)
                  {
                    var m_c = tipuesearch.pages[i].tags.match(pat).length;
                    score += (10 * m_c);
                  }
                }
                if (tipuesearch.pages[i].url.search(pat) != -1)
                {
                  score += 20;
                }
                
                if (score != 0)
                {
                  for (var e = 0; e < tipuesearch_weight.weight.length; e++)
                  {
                    if (tipuesearch.pages[i].url == tipuesearch_weight.weight[e].url)
                    {
                      score += tipuesearch_weight.weight[e].score;
                    }
                  }
                }
                
                if (d_w[f].match('^-'))
                {
                  pat = new RegExp(d_w[f].substring(1), 'i');
                  if (tipuesearch.pages[i].title.search(pat) != -1 || tipuesearch.pages[i].text.search(pat) != -1 || tipuesearch.pages[i].tags.search(pat) != -1)
                  {
                    score = 0;     
                  }    
                }
              }
              
              if (score != 0)
              {
                found.push(
                  {
                    "score": score,
                    "title": tipuesearch.pages[i].title,
                    "desc": s_t,
                    "img": tipuesearch.pages[i].img, 
                    "url": tipuesearch.pages[i].url,
                    "note": tipuesearch.pages[i].note
                  });
                  c++;                                                                   
                }
              }
            }
            else
            {
              for (var i = 0; i < tipuesearch.pages.length; i++)
              {
                var score = 0;
                var s_t = tipuesearch.pages[i].text;
                var pat = new RegExp(d, 'gi');
                if (tipuesearch.pages[i].title.search(pat) != -1)
                {
                  var m_c = tipuesearch.pages[i].title.match(pat).length;
                  score += (20 * m_c);
                }
                if (tipuesearch.pages[i].text.search(pat) != -1)
                {
                  var m_c = tipuesearch.pages[i].text.match(pat).length;
                  score += (20 * m_c);
                }
                if (tipuesearch.pages[i].tags)
                {
                  if (tipuesearch.pages[i].tags.search(pat) != -1)
                  {
                    var m_c = tipuesearch.pages[i].tags.match(pat).length;
                    score += (10 * m_c);
                  }
                }
                if (tipuesearch.pages[i].url.search(pat) != -1)
                {
                  score += 20;
                }
                
                if (score != 0)
                {
                  for (var e = 0; e < tipuesearch_weight.weight.length; e++)
                  {
                    if (tipuesearch.pages[i].url == tipuesearch_weight.weight[e].url)
                    {
                      score += tipuesearch_weight.weight[e].score;
                    }
                  }
                }
                
                if (score != 0)
                {
                  found.push(
                    {
                      "score": score,
                      "title": tipuesearch.pages[i].title,
                      "desc": s_t,
                      "img": tipuesearch.pages[i].img,
                      "url": tipuesearch.pages[i].url,
                      "note": tipuesearch.pages[i].note
                    });
                    c++;                                                                  
                  }                              
                }
              }                         
              
              if (c != 0)
              {
                if (set.showTitleCount && tipuesearch_t_c == 0)
                {
                  var title = document.title;
                  document.title = '(' + c + ') ' + title;
                  tipuesearch_t_c++;
                }                         
                
                if (c == 1)
                {
                  //out += '<div id="tipue_search_results_count">' + tipuesearch_string_4;
                  out += '<h1><div id="tipue_search_results_count">' + tipuesearch_string_4 + ' “<strong>'+d+'</strong>”</h1>';
                }
                else
                {
                  var c_c = c.toString().padStart(2, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  //var c_c = c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  //out += '<div id="tipue_search_results_count">' + c_c + ' ' + tipuesearch_string_5;
                  out += '<h1><div id="tipue_search_results_count">' + c_c + ' ' + tipuesearch_string_2 + ' “<strong>'+d+'</strong>”</h1>';
                }
                if (set.showTime)
                {
                  var endTimer = new Date().getTime();
                  var time = (endTimer - startTimer) / 1000;
                  out += ' <p>(' + time.toFixed(2) + ' ' + tipuesearch_string_14 + ')</p>';
                  set.showTime = false;
                }
                out += '</div>';
                
                if (set.showRelated && standard)
                {
                  f = 0;
                  for (var i = 0; i < tipuesearch_related.Related.length; i++)
                  {
                    if (d == tipuesearch_related.Related[i].search)
                    {
                      if (!f)
                      {
                        out += '<p class="tipue_search_related">' + tipuesearch_string_10 + '</p><div class="tipue_search_related_block">';
                      }
                      if (show_replace)
                      {
                        d_o = d;
                      }
                      
                      if (tipuesearch_related.Related[i].include)
                      {
                        var r_d = d_o + ' ' + tipuesearch_related.Related[i].related;
                      }
                      else
                      {
                        var r_d = tipuesearch_related.Related[i].related;
                      }                                             
                      
                      out += '<a class="tipue_search_related_btn" id="' + r_d + '">' + tipuesearch_related.Related[i].related + '</a>';
                      f++;         
                    }
                  }
                  if (f)
                  {
                    out += '</div>';
                  }   
                }
                
                if (show_replace)
                {
                  out += '<p id="tipue_search_replace">' + tipuesearch_string_2 + ' ' + d + '. ' + tipuesearch_string_3 + ' <a id="tipue_search_replaced">' + d_r + '</a></p>';
                }
                
                found.sort(function(a, b) { return b.score - a.score } );
                
                var l_o = 0;
                
                if (set.imageZoom)
                {
                  out += '<div id="tipue_search_image_modal"><div class="tipue_search_image_close">&#10005;</div><div class="tipue_search_image_block"><a id="tipue_search_zoom_url"><img id="tipue_search_zoom_img"></a><div id="tipue_search_zoom_text"></div></div></div>';    
                }
                
                for (var i = 0; i < found.length; i++)
                {
                  if (l_o >= start && l_o < set.show + start)
                  {
                    out += '<div class="tipue_search_result">';
                    
                    out += '<div class="tipue_search_content_title"><a href="' + found[i].url + '"' + tipue_search_w + '>' +  found[i].title + '</a></div>';
                    
                    if (set.debug)
                    {                                             
                      out += '<div class="tipue_search_content_debug">Score: ' + found[i].score + '</div>';
                    }
                    
                    if (found[i].img)
                    {
                      if (set.imageZoom)
                      {
                        out += '<div class="tipue_search_image"><img class="tipue_search_img tipue_search_image_zoom" src="' + found[i].img + '" alt="' + found[i].title + '" data-url="' + found[i].url + '"></div>';     
                      }
                      else
                      {
                        out += '<div class="tipue_search_image"><a href="' + found[i].url + '"' + tipue_search_w + '><img class="tipue_search_img" src="' + found[i].img + '" alt="' + found[i].title + '"></a></div>';
                      }
                    }
                    
                    if (found[i].desc)
                    {                                        
                      var t = found[i].desc;
                      
                      if (set.showContext)
                      {
                        d_w = d.split(' ');
                        var s_1 = found[i].desc.toLowerCase().indexOf(d_w[0]);
                        if (s_1 > set.contextStart)
                        {
                          var t_1 = t.substr(s_1 - set.contextBuffer);
                          var s_2 = t_1.indexOf(' ');
                          t_1 = t.substr(s_1 - set.contextBuffer + s_2);
                          t_1 = $.trim(t_1);
                          
                          if (t_1.length > set.contextLength)
                          {                                                      
                            t = '... ' + t_1;
                          }
                        }   
                      }
                      
                      if (standard)
                      {
                        d_w = d.split(' ');
                        for (var f = 0; f < d_w.length; f++)
                        {
                          if (set.highlightTerms)
                          {
                            var patr = new RegExp('(' + d_w[f] + ')', 'gi');
                            t = t.replace(patr, "<h0011>$1<h0012>");
                          }
                        }
                      }
                      else if (set.highlightTerms)
                      {
                        var patr = new RegExp('(' + d + ')', 'gi');
                        t = t.replace(patr, "<span class=\"tipue_search_content_bold\">$1</span>");
                      }
                      
                      var t_d = '';
                      var t_w = t.split(' ');
                      if (t_w.length < set.descriptiveWords)
                      {
                        t_d = t;
                      }
                      else
                      {
                        for (var f = 0; f < set.descriptiveWords; f++)
                        {
                          t_d += t_w[f] + ' '; 	
                        }
                      }
                      t_d = $.trim(t_d);
                      if (t_d.charAt(t_d.length - 1) != '.')
                      {
                        t_d += ' ...';
                      }
                      
                      t_d = t_d.replace(/h0011/g, 'span class=\"tipue_search_content_bold\"');
                      t_d = t_d.replace(/h0012/g, '/span');
                      
                      out += '<div class="tipue_search_content_text">' + t_d + '</div>';
                    }
                    
                    if (set.showURL)
                    {
                      var s_u = found[i].url.toLowerCase();
                      if (s_u.indexOf('http://') == 0)
                      {
                        s_u = s_u.slice(7);
                      }                                             
                      out += '<div class="tipue_search_content_url"><a href="' + found[i].url + '"' + tipue_search_w + '>' + 'Details anzeigen' + '</a></div>';
                    }
                    
                    if (found[i].note)
                    {
                      out += '<div class="tipue_search_note">' + found[i].note + '</div>';    
                    }                                       
                    
                    out += '</div>';
                  }
                  l_o++;     
                }                              
                
                if (c > set.show)
                {
                  var pages = Math.ceil(c / set.show);
                  var page = (start / set.show);
                  if (set.footerPages < 3)
                  {
                    set.footerPages = 3;
                  }
                  
                  out += '<div id="tipue_search_foot"><ul id="tipue_search_foot_boxes">';
                  
                  if (start > 0)
                  {
                    out += '<li role="navigation"><a class="tipue_search_foot_box" accesskey="b" id="' + (start - set.show) + '_' + replace + '">' + tipuesearch_string_6 + '</a></li>'; 
                  }
                  
                  if (page <= 2)
                  {
                    var p_b = pages;
                    if (pages > set.footerPages)
                    {
                      p_b = set.footerPages;
                    }                    
                    for (var f = 0; f < p_b; f++)
                    {
                      if (f == page)
                      {
                        out += '<li class="current" role="navigation">' + (f + 1) + '</li>';
                      }
                      else
                      {
                        out += '<li role="navigation"><a class="tipue_search_foot_box" id="' + (f * set.show) + '_' + replace + '">' + (f + 1) + '</a></li>';
                      }
                    }
                  }
                  else
                  {
                    var p_b = page + set.footerPages - 1;
                    if (p_b > pages)
                    {
                      p_b = pages; 
                    }
                    for (var f = page - 1; f < p_b; f++)
                    {
                      if (f == page)
                      {
                        out += '<li class="current" role="navigation">' + (f + 1) + '</li>';
                      }
                      else
                      {
                        out += '<li role="navigation"><a class="tipue_search_foot_box" id="' + (f * set.show) + '_' + replace + '">' + (f + 1) + '</a></li>';
                      }
                    }
                  }                         
                  
                  if (page + 1 != pages)
                  {
                    out += '<li role="navigation"><a class="tipue_search_foot_box" accesskey="m" id="' + (start + set.show) + '_' + replace + '">' + tipuesearch_string_7 + '</a></li>'; 
                  }                    
                  
                  out += '</ul></div>';
                }
                
              }
              else
              {
                out += '<div id="tipue_search_error" class="tipue_search_error">' + tipuesearch_string_8 + noResultData + '</div>'; 
              }
            }
            else
            {
              if (show_stop)
              {
                out += '<div id="tipue_search_error" class="tipue_search_error">' + tipuesearch_string_8 + ' ' + tipuesearch_string_9 + noResultData + '</div>';     
              }
              else
              {
                if (set.minimumLength == 1)
                {
                  out += '<div id="tipue_search_error" class="tipue_search_error">' + tipuesearch_string_11 + noResultData + '</div>';
                }
                else
                {
                  out += '<div id="tipue_search_error" class="tipue_search_error">' + tipuesearch_string_12 + ' ' /*+ set.minimumLength*/ + ' ' + tipuesearch_string_13 + noResultData + '</div>';
                }
              }
            }                
            
            $('#tipue_search_content').hide().html(out).slideDown(200);
            
            $('#tipue_search_replaced').click(function()
            {
              getTipueSearch(0, false);
            });
            
            $('.tipue_search_related_btn').click(function()
            {
              $('#tipue_search_input').val($(this).attr('id'));
              getTipueSearch(0, true);
            });
            
            $('.tipue_search_image_zoom').click(function()
            {
              $('#tipue_search_image_modal').fadeIn(300);
              $('#tipue_search_zoom_img').attr('src', this.src);
              
              var z_u = $(this).attr('data-url');
              $('#tipue_search_zoom_url').attr('href', z_u);
              
              var z_o = this.alt + '<div class="tipue_search_zoom_options"><a href="' + this.src + '" target="_blank">' + tipuesearch_string_15 + '</a>&nbsp; <a href="' + z_u + '">' + tipuesearch_string_16 + '</a></div>';
              
              $('#tipue_search_zoom_text').html(z_o);
            });
            
            $('.tipue_search_image_close').click(function()
            {
              $('#tipue_search_image_modal').fadeOut(300);
            });                
            
            $('.tipue_search_foot_box').click(function()
            {
              var id_v = $(this).attr('id');
              var id_a = id_v.split('_');
              getTipueSearch(parseInt(id_a[0]), id_a[1]);
            });                                                       
          }          
          
    });
  };
  /* ---------- tipue search ends ---------- */
  
  /* ---------- back to top plugin starts ---------- */
  $.fn.topLink = function (settings) {
    settings = jQuery.extend({
      min: 1,
      fadeSpeed: 200,
      ieOffset: 50
    }, settings);
    return this.each(function () {
      //listen for scroll
      var el = $(this);
      el.css('display', 'none'); //in case the user forgot
      $(window).scroll(function () {
        if (!jQuery.support.hrefNormalized) {
          el.css({
            //'position': 'absolute',
            //'top': $j(window).scrollTop() + $j(window).height() - settings.ieOffset
          });
        }
        if ($(window).scrollTop() >= settings.min) {
          el.fadeIn(settings.fadeSpeed);
        } else {
          el.fadeOut(settings.fadeSpeed);
        }
      });
    });
  };
  /* ---------- back to top plugin ends ---------- */
  
  /* ---------- code reusage function starts ---------- */
  function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByClassName("include");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
              if(callFlag == 0){
                addCurrentClassToMenu();
                tipueInit();
                removeHomeLink();
                callFlag = 1;
              }
            }
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
            topOfPage();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };
  /* ---------- code reusage function ends ---------- */
  
  /* ---------- adding active class in menu starts ---------- */
  function addCurrentClassToMenu(){
    var url = window.location.pathname,
    urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");
    if(urlRegExp == '/$/'){
      $('.menu__item__first').addClass('menu__item--current');
      return;
    }
    $('.menu a').each(function () {
      if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
        $(this).parent().addClass('menu__item--current');
      }
    });
    
    $('.menu__has-children').each(function(e){
      $(this).find('.menu__dropdown--product__content').each(function(e){
        if($(this).hasClass('menu__item--current')){
          $(this).parents('.menu__has-children').addClass('menu__item--current');
          return;
        }
      });
    });
  }
  /* ---------- adding active class in menu ends ---------- */
  
  /* ---------- back to top function starts ---------- */
  function topOfPage(){
    
    $('#auto-top-link').topLink({
      min: 1,
      fadeSpeed: 500
    });
    
    //smoothscroll
    $('#auto-top-link').on('click', function (e) {
      e.preventDefault();
      var offset = $("body").offset();
      $("html,body").animate({
        // scrollTop: offset.top,
        scrollTop: 0,
        scrollLeft: offset.left
      });
    });
  }
  /* ---------- back to top function ends ---------- */
  
  /* ---------- tipue init function starts ---------- */
  function tipueInit(){
    $('#tipue_search_input').tipuesearch({      
      'show': 30,
      'showContext': true
    });
  }
  /* ---------- tipue init function ends ---------- */
  
  /* ---------- remove home link starts ---------- */
  function removeHomeLink(){
    if($('body').hasClass('homepage')){
      $('.logo__image').unwrap();
    }
  }
  /* ---------- remove home link ends ---------- */
  
  $(document).ready(function (e) {
    
    /* ---------- including reusable code starts ---------- */
    includeHTML();
    /* ---------- including reusable code ends ---------- */
    
    /* ---------- sticky nav starts ---------- */
    if($(window).width() >= 768){
      var stickyNavTop = 0;
      var stickyNav = function(){
        var scrollTop = $(window).scrollTop(); 
        if (scrollTop > stickyNavTop) { 
          $('.header').addClass('sticky');
        } else {
          $('.header').removeClass('sticky'); 
        }
      };
      
      stickyNav();
      
      $(window).scroll(function() {
        stickyNav();
      });
    }
    /* ---------- sticky nav ends ---------- */
    
    /* ---------- Mobile menu starts ---------- */
    if($(window).width() < 768){
      
      $(document).on('click', '.menu__hamburger-wrapper',  function(e){
        if($(this).hasClass('open')){
          $(this).removeClass('open');
          $('#menu').slideUp('slow');
        }else{
          $(this).addClass('open');
          $('#menu').slideDown('slow');
        }
      });

      $(document).on('click touchstart', function(event) {
        if (!$(event.target).closest('.menu__hamburger-wrapper').length && !$(event.target).closest('.menu').length) {
              if ($('.menu__hamburger-wrapper').hasClass('open')) {
                $('.menu__hamburger-wrapper').removeClass('open');
                $('#menu').slideUp('slow');
              }
          }
      },{passive: true});
      
      $(document).on('click', '.menu__showmore',  function(e){
        if($(this).parent().hasClass('open')){
          $(this).parent().removeClass('open');
          $(this).siblings('.menu__dropdown').slideUp('slow');
        }else{
          $(this).parent().addClass('open');
          $(this).siblings('.menu__dropdown').slideDown('slow');
        }
      });
    }
    /* ---------- Mobile menu ends ---------- */
    
  });

  /* ---------- PWA starts ---------- */
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceworker.js')
      .then(() => {
        console.log('[Service Worker] Registered Service Worker...')
      })
      .catch((error) => {
        console.log('[Service Worker] Error while registering Service Worker...',error)
      })
  }
  /* ---------- PWA ends ---------- */
      
})(jQuery);
    