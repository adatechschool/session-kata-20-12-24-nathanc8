import { group } from 'console';
import fs from 'fs';

const adnFilePath = './adn.txt';

//Etape A.1 : découper le fichier texte en plusieurs codons (séquence de 3 caractères)
//récupération de la chaine de caractères
function readFile(path) {
	try {
		const content = fs.readFileSync(path, 'utf-8');
		return content;
	} catch (err) {
		console.error('Erreur lors de la lecture du fichier :', err);
		return null;
	}
}

const adnString = readFile(adnFilePath);

//split la chaine de caractères tous les n caractères
function splitStringIntoEqualsLengthStrings(stringToSplit, desiredSringLength) {
	const arr = [];
	for (let i = 0; i < adnString.length; i += desiredSringLength) {
		let codon = adnString.substring(i, i + desiredSringLength);
		arr.push(codon);
	}
	return arr;
}

//Etape A.2 : convertir le tableau d'adn en chaine de protéines
//@Todo Le dernier codon n'est pas reconnu, je dois me pencher dessus si j'ai le temps
function convertAdnToProtein() {
	const adnArray = splitStringIntoEqualsLengthStrings(adnString, 3);
	const adnConversionTable = {
		ATA: 'I',
		ATC: 'I',
		ATT: 'I',
		ATG: 'M',
		ACA: 'T',
		ACC: 'T',
		ACG: 'T',
		ACT: 'T',
		AAC: 'N',
		AAT: 'N',
		AAA: 'K',
		AAG: 'K',
		AGC: 'S',
		AGT: 'S',
		AGA: 'R',
		AGG: 'R',
		CTA: 'L',
		CTC: 'L',
		CTG: 'L',
		CTT: 'L',
		CCA: 'P',
		CCC: 'P',
		CCG: 'P',
		CCT: 'P',
		CAC: 'H',
		CAT: 'H',
		CAA: 'Q',
		CAG: 'Q',
		CGA: 'R',
		CGC: 'R',
		CGG: 'R',
		CGT: 'R',
		GTA: 'V',
		GTC: 'V',
		GTG: 'V',
		GTT: 'V',
		GCA: 'A',
		GCC: 'A',
		GCG: 'A',
		GCT: 'A',
		GAC: 'D',
		GAT: 'D',
		GAA: 'E',
		GAG: 'E',
		GGA: 'G',
		GGC: 'G',
		GGG: 'G',
		GGT: 'G',
		TCA: 'S',
		TCC: 'S',
		TCG: 'S',
		TCT: 'S',
		TTC: 'F',
		TTT: 'F',
		TTA: 'L',
		TTG: 'L',
		TAC: 'Y',
		TAT: 'Y',
		TAA: '_',
		TAG: '_',
		TGC: 'C',
		TGT: 'C',
		TGA: '_',
		TGG: 'W',
	};

	const proteinArray = adnArray.map((codon) => {
		return adnConversionTable[codon] || '?';
	});

	return proteinArray.join('');
}

//Etape B.2 : découpage des séquences de 25 en plusieurs tableaux de 5 éléments chacun. Comprend l'étape B.1
//Pourrait être améliorée
function splitAdnToGroupsOf5() {
	const adnWith25chars = splitStringIntoEqualsLengthStrings(adnString, 25);
	let adnSequences = [];
	//itération sur les chaines de 25 nucléotides
	for (let i = 0; i < adnWith25chars.length; i++) {
		let groupsOf5 = [];
		//itération par 5 sur chaque chaine de 25 nucléotides
		for (let j = 0; j < adnWith25chars[i].length; j += 5) {
			//sélection des éléments à mettre dans chaque tableau de longueur 5
			let adnGroupedBy5 = adnWith25chars
				//Je ne suis pas sûr que cette logique soit la plus optimale. Améliorations à faire.
				.join()
				.substring(j, j + 5)
				.split('');
			groupsOf5.push(adnGroupedBy5);
		}
		adnSequences.push(groupsOf5);
	}
	return adnSequences;
}

//Etape B.3 : Pas eu le temps.
