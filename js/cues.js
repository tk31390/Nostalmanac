/** Trusted 90s cues. Cover mills and karaoke = no song. */

const JUNK = /karaoke|tribute|\bcover\b|lullaby|8-bit|8 bit|chiptune|kidz bop|mr dooves|piano version|piano tribute|music box|hit crew|drew'?s famous|toon tunes|tv themes|television'?s greatest|relaxing|lo-?fi|string quartet|glee cast|workout|yoga|sleep music|white noise|geek music|kids superstars|trap geek|nstens|toonosaurs|warp zone|sheet music boss|vitamin string|zoom karaoke|urock|acapella|a cappella|vgr remix|holiday remix|ottawa guitar|mario piano|gentle game|pokestir|arcade player|retro crowd|8 bit universe|music legends|punk cover|megaraptor|postmodern jukebox|thefatrat|jonathan young|i tromboni|camille berthollet|christian schumann|union of sound|pope brandon|random encounter|syncopix|kids superstars|bobmusic/i;

const CUES = {
  // cartoons
  'captain planet and the planeteers': { queries: ['Captain Planet Tom Worrall soundtrack'], want: ['worrall', 'planeteer'], why: 'Captain Planet theme' },
  'tiny toon adventures': { queries: ['Tiny Toon Adventures theme Warner Bros'], want: ['tiny toon', 'warner'], why: 'Tiny Toons theme' },
  'the simpsons': { queries: ['The Simpsons Theme Danny Elfman'], want: ['elfman', 'simpsons'], why: 'Simpsons theme' },
  'rugrats': { queries: ['Rugrats Theme Mark Mothersbaugh', 'Rugrats original theme song'], want: ['rugrats'], why: 'Rugrats theme' },
  'doug': { queries: ['Doug Funnie theme song original Nickelodeon'], want: ['doug'], why: 'Doug theme' },
  'the ren & stimpy show': { queries: ['Ren and Stimpy Happy Happy Joy Joy original', 'Ren Stimpy theme song original'], want: ['ren', 'stimpy'], why: 'Ren & Stimpy' },
  'batman: the animated series': { queries: ['Batman The Animated Series theme Shirley Walker'], want: ['shirley walker', 'batman'], why: 'Batman TAS theme' },
  'animaniacs': { queries: ['Animaniacs Opening Title Animaniacs'], want: ['animaniacs'], why: 'Animaniacs theme' },
  'mighty morphin power rangers': { queries: ['Go Go Power Rangers Ron Wasserman'], want: ['wasserman', 'power ranger'], why: 'Go Go Power Rangers' },
  "rocko's modern life": { queries: ["Rocko's Modern Life Theme Song Pat Irwin"], want: ['irwin', 'rocko'], why: "Rocko's theme" },
  'gargoyles': { queries: ['Gargoyles Main Title Carl Johnson'], want: ['gargoyles', 'johnson'], why: 'Gargoyles theme' },
  'aaahh!!! real monsters': { queries: ['Aaahh Real Monsters theme song original'], want: ['real monsters'], why: 'Real Monsters theme' },
  'pinky and the brain': { queries: ['Pinky and the Brain Animaniacs'], want: ['pinky', 'brain'], why: 'Pinky and the Brain' },
  'hey arnold!': { queries: ['Hey Arnold theme song original Nickelodeon'], want: ['arnold'], why: 'Hey Arnold! theme' },
  "dexter's laboratory": { queries: ["Dexter's Laboratory theme song original"], want: ['dexter'], why: "Dexter's Lab theme" },
  'the magic school bus': { queries: ['Magic School Bus Little Richard Ride on the Magic School Bus'], want: ['little richard', 'magic school'], why: 'Magic School Bus theme' },
  'recess': { queries: ['Recess theme song original Disney'], want: ['recess'], why: 'Recess theme' },
  'south park': { queries: ['South Park Theme Primus'], want: ['primus', 'south park'], why: 'South Park theme' },
  'the powerpuff girls': { queries: ['Powerpuff Girls Bis Fight', 'Powerpuff Girls theme original'], want: ['powerpuff', 'bis'], why: 'Powerpuff Girls' },
  'pokémon': { queries: ['Pokemon Theme Jason Paige'], want: ['jason paige', 'pokemon'], why: 'Pokémon theme' },
  'catdog': { queries: ['CatDog Theme Song Nickelodeon'], want: ['catdog', 'nickelodeon'], why: 'CatDog theme' },
  'spongebob squarepants': { queries: ['SpongeBob SquarePants Theme Song'], want: ['spongebob'], why: 'SpongeBob theme' },
  'ed, edd n eddy': { queries: ['Ed Edd n Eddy theme original'], want: ['eddy'], why: "Ed, Edd n Eddy theme" },
  'darkwing duck': { queries: ['Darkwing Duck Theme Disney Afternoon Studio Chorus'], want: ['darkwing', 'disney'], why: 'Darkwing Duck theme' },
  'talespin': { queries: ['TaleSpin Theme Disney Afternoon Studio Chorus'], want: ['talespin', 'disney'], why: 'TaleSpin theme' },
  'x-men: the animated series': { queries: ['X-Men Animated Series theme Ron Wasserman', 'X-Men cartoon theme original'], want: ['x-men', 'wasserman'], why: 'X-Men theme' },
  'spider-man: the animated series': { queries: ['Spider-Man 1994 animated series theme'], want: ['spider-man', 'spider man'], why: 'Spider-Man 94 theme' },
  'beavis and butt-head': { queries: ['Beavis and Butt-Head theme original'], want: ['beavis'], why: 'Beavis and Butt-Head' },
  'the tick': { queries: ['The Tick Theme Doug Katsaros'], want: ['katsaros', 'tick'], why: 'The Tick theme' },
  'the angry beavers': { queries: ['Angry Beavers theme original Nickelodeon'], want: ['beaver'], why: 'Angry Beavers theme' },
  'daria': { queries: ['Splendora Youre Standing on My Neck Daria', 'Daria Official MTV Theme Splendora'], want: ['splendora', 'daria'], why: "You're Standing on My Neck" },
  'johnny bravo': { queries: ['Johnny Bravo theme original'], want: ['johnny bravo'], why: 'Johnny Bravo theme' },
  'cow and chicken': { queries: ['Cow and Chicken theme original'], want: ['cow and chicken'], why: 'Cow and Chicken theme' },
  'the wild thornberrys': { queries: ['Wild Thornberrys theme original'], want: ['thornberry'], why: 'Wild Thornberrys theme' },
  'rocket power': { queries: ['Rocket Power Theme The Wipeouters'], want: ['wipeouters', 'rocket power'], why: 'Rocket Power theme' },
  'courage the cowardly dog': { queries: ['Courage the Cowardly Dog theme original'], want: ['courage'], why: 'Courage theme' },
  'sailor moon': { queries: ['Sailor Moon Theme English opening Fighting Evil by Moonlight'], want: ['sailor moon'], why: 'Sailor Moon theme' },
  'dragon ball z': { queries: ['Rock the Dragon Dragon Ball Z', 'Dragon Ball Z Rock the Dragon theme'], want: ['rock the dragon', 'dragon ball'], why: 'Rock the Dragon' },
  'reboot': { queries: ['ReBoot theme original'], want: ['reboot'], why: 'ReBoot theme' },
  'freakazoid!': { queries: ['Freakazoid theme original'], want: ['freakazoid'], why: 'Freakazoid theme' },
  'king of the hill': { queries: ['King of the Hill Theme The Refreshments'], want: ['refreshments', 'king of the hill'], why: 'King of the Hill theme' },
  'futurama': { queries: ['Futurama Main Theme Christopher Tyng'], want: ['tyng', 'futurama'], why: 'Futurama theme' },
  'ducktales': { queries: ['DuckTales Theme Mark Mueller'], want: ['ducktales', 'mueller'], why: 'DuckTales theme' },
  "chip 'n dale: rescue rangers": { queries: ['Rescue Rangers Theme Mark Mueller'], want: ['rescue rangers'], why: 'Rescue Rangers theme' },
  'digimon adventure': { queries: ['Digimon Theme Paul Gordon'], want: ['digimon'], why: 'Digimon theme' },
  'batman beyond': { queries: ['Batman Beyond Theme Shirley Walker'], want: ['batman beyond', 'walker'], why: 'Batman Beyond theme' },
  'swat kats: the radical squadron': { queries: ['SWAT Kats Theme'], want: ['swat kats'], why: 'SWAT Kats theme' },

  // movies
  'home alone': { queries: ['Somewhere in My Memory John Williams Home Alone'], want: ['john williams', 'home alone', 'memory'], why: 'Somewhere in My Memory' },
  'ghost': { queries: ['Unchained Melody Righteous Brothers'], want: ['righteous', 'unchained'], why: 'Unchained Melody' },
  'pretty woman': { queries: ['Oh Pretty Woman Roy Orbison'], want: ['orbison', 'pretty woman'], why: 'Oh, Pretty Woman' },
  'beauty and the beast': { queries: ['Beauty and the Beast Celine Dion Peabo Bryson'], want: ['celine', 'peabo', 'beauty and the beast'], why: 'Beauty and the Beast' },
  'terminator 2: judgment day': { queries: ['Terminator 2 Theme Brad Fiedel'], want: ['fiedel', 'terminator'], why: 'Terminator 2 theme' },
  'aladdin': { queries: ['A Whole New World Peabo Bryson Regina Belle'], want: ['whole new world', 'peabo'], why: 'A Whole New World' },
  "wayne's world": { queries: ['Bohemian Rhapsody Queen'], want: ['queen', 'bohemian'], why: 'Bohemian Rhapsody' },
  'jurassic park': { queries: ['Jurassic Park Theme John Williams'], want: ['john williams', 'jurassic'], why: 'Jurassic Park theme' },
  'the nightmare before christmas': { queries: ['This Is Halloween Danny Elfman'], want: ['halloween', 'elfman'], why: 'This Is Halloween' },
  'mrs. doubtfire': { queries: ['Mrs Doubtfire Main Title Howard Shore'], want: ['doubtfire', 'shore'], why: 'Mrs. Doubtfire score' },
  'the lion king': { queries: ['Circle of Life Elton John Carmen Twillie'], want: ['circle of life', 'elton'], why: 'Circle of Life' },
  'forrest gump': { queries: ['Forrest Gump Suite Alan Silvestri'], want: ['silvestri', 'forrest gump'], why: 'Forrest Gump Suite' },
  'the mask': { queries: ['Cuban Pete Jim Carrey The Mask'], want: ['cuban pete', 'mask'], why: 'Cuban Pete' },
  'toy story': { queries: ["You've Got a Friend in Me Randy Newman"], want: ['randy newman', 'friend in me'], why: "You've Got a Friend in Me" },
  'clueless': { queries: ['Kids in America Kim Wilde'], want: ['kim wilde', 'kids in america'], why: 'Kids in America' },
  'babe': { queries: ['If I Had Words Babe soundtrack'], want: ['babe', 'words'], why: 'If I Had Words' },
  'independence day': { queries: ['Independence Day theme David Arnold'], want: ['david arnold', 'independence'], why: 'Independence Day score' },
  'space jam': { queries: ['Space Jam Quad City DJs'], want: ['quad city', 'space jam'], why: 'Space Jam' },
  'twister': { queries: ['Humans Being Van Halen Twister'], want: ['van halen', 'humans being'], why: 'Humans Being' },
  'men in black': { queries: ['Men in Black Will Smith'], want: ['will smith', 'men in black'], why: 'Men in Black' },
  'titanic': { queries: ['My Heart Will Go On Celine Dion'], want: ['celine', 'heart will go on'], why: 'My Heart Will Go On' },
  'austin powers': { queries: ['Soul Bossa Nova Quincy Jones'], want: ['quincy', 'soul bossa'], why: 'Soul Bossa Nova' },
  'austin powers: international man of mystery': { queries: ['Soul Bossa Nova Quincy Jones'], want: ['quincy', 'soul bossa'], why: 'Soul Bossa Nova' },
  'the truman show': { queries: ['Truman Sleeps Philip Glass'], want: ['philip glass', 'truman'], why: 'Truman Sleeps' },
  'the rugrats movie': { queries: ['Rugrats Theme Mark Mothersbaugh'], want: ['rugrats'], why: 'Rugrats theme' },
  "a bug's life": { queries: ["A Bug's Life Randy Newman"], want: ['randy newman', 'bug'], why: "A Bug's Life score" },
  'the matrix': { queries: ['Clubbed to Death Rob Dougan Matrix'], want: ['dougan', 'clubbed'], why: 'Clubbed to Death' },
  'toy story 2': { queries: ['When She Loved Me Sarah McLachlan'], want: ['mclachlan', 'loved me'], why: 'When She Loved Me' },
  'the iron giant': { queries: ['The Iron Giant Michael Kamen'], want: ['kamen', 'iron giant'], why: 'Iron Giant score' },
  '10 things i hate about you': { queries: ["Can't Take My Eyes Off You Heath Ledger", "Can't Take My Eyes Off You Frankie Valli"], want: ['eyes off you'], why: "Can't Take My Eyes Off You" },
  'the addams family': { queries: ['Addams Family Theme Vic Mizzy'], want: ['mizzy', 'addams'], why: 'Addams Family theme' },
  'home alone 2: lost in new york': { queries: ['Somewhere in My Memory John Williams Home Alone 2'], want: ['john williams', 'memory'], why: 'Somewhere in My Memory' },
  'the sandlot': { queries: ['The Sandlot theme David Newman'], want: ['sandlot'], why: 'The Sandlot score' },
  'cool runnings': { queries: ['I Can See Clearly Now Jimmy Cliff'], want: ['jimmy cliff', 'clearly'], why: 'I Can See Clearly Now' },
  'the flintstones': { queries: ['Meet the Flintstones'], want: ['flintstones'], why: 'Meet the Flintstones' },
  'the santa clause': { queries: ['The Santa Clause Michael Convertino'], want: ['santa clause'], why: 'The Santa Clause score' },
  'ace ventura: when nature calls': { queries: ['Ace Ventura When Nature Calls soundtrack'], want: ['ace ventura'], why: 'Ace Ventura' },
  'casper': { queries: ['Casper the Friendly Ghost James Horner'], want: ['casper'], why: 'Casper' },
  'jumanji': { queries: ['Jumanji theme James Horner'], want: ['jumanji', 'horner'], why: 'Jumanji score' },
  'apollo 13': { queries: ['Apollo 13 theme James Horner'], want: ['apollo', 'horner'], why: 'Apollo 13 score' },
  'pocahontas': { queries: ['Colors of the Wind Vanessa Williams'], want: ['colors of the wind', 'vanessa'], why: 'Colors of the Wind' },
  'a goofy movie': { queries: ['I 2 I A Goofy Movie Powerline', 'Stand Out A Goofy Movie'], want: ['goofy', 'powerline', 'stand out', 'i 2 i'], why: 'I 2 I' },
  'the hunchback of notre dame': { queries: ['Topsy Turvy Hunchback of Notre Dame'], want: ['topsy', 'hunchback'], why: 'Topsy Turvy' },
  'matilda': { queries: ['Matilda Little Bitty Pretty One'], want: ['matilda'], why: 'Matilda' },
  'hercules': { queries: ['Zero to Hero Hercules Disney'], want: ['zero to hero', 'hercules'], why: 'Zero to Hero' },
  'the fifth element': { queries: ['Diva Dance Eric Serra Fifth Element'], want: ['serra', 'diva', 'fifth element'], why: 'Diva Dance' },
  'mulan': { queries: ["I'll Make a Man Out of You Donny Osmond"], want: ['man out of you', 'mulan'], why: "I'll Make a Man Out of You" },
  'the parent trap': { queries: ['Lets Get Together Hayley Mills Parent Trap'], want: ['get together', 'parent trap'], why: "Let's Get Together" },
  'armageddon': { queries: ["I Don't Want to Miss a Thing Aerosmith"], want: ['aerosmith', 'miss a thing'], why: "I Don't Want to Miss a Thing" },
  'the mask of zorro': { queries: ['I Want to Spend My Lifetime Loving You Marc Anthony Tina Arena'], want: ['lifetime loving you', 'zorro'], why: 'I Want to Spend My Lifetime Loving You' },
  'star wars: episode i – the phantom menace': { queries: ['Duel of the Fates John Williams'], want: ['duel of the fates', 'williams'], why: 'Duel of the Fates' },
  'the sixth sense': { queries: ['The Sixth Sense James Newton Howard'], want: ['sixth sense', 'howard'], why: 'The Sixth Sense score' },
  'the mummy': { queries: ['The Mummy theme Jerry Goldsmith'], want: ['mummy', 'goldsmith'], why: 'The Mummy score' },
  'tarzan': { queries: ["You'll Be in My Heart Phil Collins"], want: ['phil collins', 'heart'], why: "You'll Be in My Heart" },
  "she's all that": { queries: ['Kiss Me Sixpence None the Richer'], want: ['sixpence', 'kiss me'], why: 'Kiss Me' },
  'american pie': { queries: ['American Pie Don McLean'], want: ['don mclean', 'american pie'], why: 'American Pie' },
  'pokémon: the first movie': { queries: ['Pokemon Theme Jason Paige'], want: ['jason paige', 'pokemon'], why: 'Pokémon theme' },
  'hocus pocus': { queries: ['I Put a Spell on You Bette Midler Hocus Pocus'], want: ['hocus pocus', 'midler'], why: 'I Put a Spell on You' },
  'back to the future part iii': { queries: ['Back to the Future Alan Silvestri'], want: ['silvestri', 'back to the future'], why: 'Back to the Future theme' },
  'office space': { queries: ['Office Space Mike Judge'], want: ['office space'], why: 'Office Space score' },
  'the blair witch project': { queries: ['The Blair Witch Project soundtrack'], want: ['blair witch'], why: 'Blair Witch' },

  // games
  'super mario world': { queries: ['Super Mario World Athletic Koji Kondo'], want: ['mario', 'kondo'], why: 'Super Mario World' },
  'sonic the hedgehog': { queries: ['Green Hill Zone Masato Nakamura'], want: ['green hill', 'nakamura'], why: 'Green Hill Zone' },
  'street fighter ii': { queries: ['Street Fighter II Ryu Stage Capcom'], want: ['street fighter', 'ryu'], why: 'Street Fighter II' },
  'sonic the hedgehog 2': { queries: ['Chemical Plant Zone Masato Nakamura Sonic 2'], want: ['chemical plant', 'sonic'], why: 'Chemical Plant Zone' },
  'super mario kart': { queries: ['Super Mario Kart Rainbow Road Koji Kondo'], want: ['mario kart', 'rainbow'], why: 'Rainbow Road' },
  'mortal kombat': { queries: ['Mortal Kombat The Immortals'], want: ['immortals', 'mortal kombat'], why: 'Mortal Kombat' },
  'nba jam': { queries: ['NBA Jam arcade soundtrack'], want: ['nba jam'], why: 'NBA Jam' },
  'doom': { queries: ["At Doom's Gate Robert Prince E1M1"], want: ['doom', 'prince'], why: "At Doom's Gate" },
  'mortal kombat ii': { queries: ['Mortal Kombat The Immortals'], want: ['immortals', 'mortal kombat'], why: 'Mortal Kombat' },
  'star fox': { queries: ['Star Fox Main Theme Nintendo'], want: ['star fox'], why: 'Star Fox theme' },
  "the legend of zelda: link's awakening": { queries: ["Link's Awakening Ballad of the Wind Fish"], want: ['zelda', 'wind fish', 'awakening'], why: "Link's Awakening" },
  'donkey kong country': { queries: ['DK Island Swing David Wise'], want: ['david wise', 'donkey kong'], why: 'DK Island Swing' },
  'super metroid': { queries: ['Super Metroid Theme of Samus Aran'], want: ['metroid', 'samus'], why: 'Super Metroid' },
  'final fantasy vi': { queries: ['Final Fantasy VI Terra Nobuo Uematsu'], want: ['uematsu', 'terra', 'final fantasy'], why: 'Terra' },
  'earthbound': { queries: ['EarthBound Pollyanna Hirokazu Tanaka'], want: ['earthbound', 'pollyanna'], why: 'Pollyanna' },
  'sonic the hedgehog 3': { queries: ['Ice Cap Zone Sonic 3'], want: ['ice cap', 'sonic'], why: 'Ice Cap Zone' },
  'earthworm jim': { queries: ['Earthworm Jim Tommy Tallarico'], want: ['earthworm', 'tallarico'], why: 'Earthworm Jim' },
  'chrono trigger': { queries: ['Chrono Trigger Main Theme Yasunori Mitsuda'], want: ['mitsuda', 'chrono'], why: 'Chrono Trigger' },
  'super mario world 2: yoshi\'s island': { queries: ["Yoshi's Island Athletic Koji Kondo"], want: ['yoshi', 'kondo'], why: "Yoshi's Island" },
  'donkey kong country 2': { queries: ['Stickerbush Symphony David Wise'], want: ['stickerbush', 'david wise'], why: 'Stickerbush Symphony' },
  'twisted metal': { queries: ['Twisted Metal title theme'], want: ['twisted metal'], why: 'Twisted Metal' },
  'super mario 64': { queries: ['Bob-omb Battlefield Koji Kondo Super Mario 64'], want: ['mario 64', 'bob-omb', 'kondo'], why: 'Bob-omb Battlefield' },
  'pokémon red and blue': { queries: ['Pokemon Theme Jason Paige'], want: ['jason paige', 'pokemon'], why: 'Pokémon theme' },
  'crash bandicoot': { queries: ['N Sanity Beach Crash Bandicoot Josh Mancell'], want: ['crash', 'mancell', 'sanity'], why: 'N. Sanity Beach' },
  'tomb raider': { queries: ['Tomb Raider Theme Nathan McCree'], want: ['tomb raider'], why: 'Tomb Raider theme' },
  'resident evil': { queries: ['Resident Evil Save Room theme Capcom'], want: ['resident evil'], why: 'Resident Evil' },
  'mario kart 64': { queries: ['Mario Kart 64 Rainbow Road'], want: ['mario kart', 'rainbow'], why: 'Rainbow Road 64' },
  'quake': { queries: ['Quake theme Trent Reznor'], want: ['quake'], why: 'Quake' },
  'wave race 64': { queries: ['Wave Race 64 theme Nintendo'], want: ['wave race'], why: 'Wave Race 64' },
  'final fantasy vii': { queries: ["Aerith's Theme Nobuo Uematsu Final Fantasy VII"], want: ['uematsu', 'aerith'], why: "Aerith's Theme" },
  'castlevania: symphony of the night': { queries: ["Dracula's Castle Michiru Yamane"], want: ['yamane', 'dracula', 'castlevania'], why: "Dracula's Castle" },
  'star fox 64': { queries: ['Star Fox 64 Corneria theme'], want: ['star fox'], why: 'Star Fox 64' },
  'gran turismo': { queries: ['Moon Over the Castle Gran Turismo Masahiro Andoh'], want: ['gran turismo', 'moon over the castle'], why: 'Moon Over the Castle' },
  'diddy kong racing': { queries: ['Diddy Kong Racing theme'], want: ['diddy kong'], why: 'Diddy Kong Racing' },
  'tekken 3': { queries: ['Tekken 3 opening theme'], want: ['tekken'], why: 'Tekken 3' },
  'the legend of zelda: ocarina of time': { queries: ['Ocarina of Time Title Theme Koji Kondo'], want: ['ocarina', 'zelda', 'kondo'], why: 'Ocarina of Time' },
  'goldeneye 007': { queries: ['GoldenEye 007 multiplayer theme original soundtrack'], want: ['goldeneye'], why: 'GoldenEye 007' },
  'metal gear solid': { queries: ['Theme of Solid Snake Metal Gear Solid'], want: ['solid snake', 'metal gear'], why: 'Theme of Solid Snake' },
  'banjo-kazooie': { queries: ['Spiral Mountain Banjo-Kazooie Grant Kirkhope'], want: ['banjo', 'kirkhope', 'spiral'], why: 'Spiral Mountain' },
  'spyro the dragon': { queries: ['Spyro the Dragon title theme Stewart Copeland'], want: ['spyro'], why: 'Spyro theme' },
  'half-life': { queries: ['Hazardous Environments Half-Life Kelly Bailey'], want: ['half-life', 'hazardous'], why: 'Hazardous Environments' },
  'starcraft': { queries: ['StarCraft Terran Theme Glenn Stafford'], want: ['starcraft', 'terran'], why: 'Terran Theme' },
  'resident evil 2': { queries: ['Resident Evil 2 soundtrack Capcom'], want: ['resident evil'], why: 'Resident Evil 2' },
  'mario party': { queries: ['Mario Party theme Nintendo'], want: ['mario party'], why: 'Mario Party' },
  'super smash bros.': { queries: ['Super Smash Bros Menu Nintendo 64'], want: ['smash'], why: 'Smash Menu' },
  "tony hawk's pro skater": { queries: ['Superman Goldfinger'], want: ['goldfinger', 'superman'], why: 'Superman' },
  'silent hill': { queries: ['Silent Hill Theme Akira Yamaoka'], want: ['yamaoka', 'silent hill'], why: 'Silent Hill' },
  'donkey kong 64': { queries: ['DK Rap Donkey Kong 64'], want: ['dk rap', 'donkey kong'], why: 'DK Rap' },
  'pokémon gold and silver': { queries: ['Pokemon Johto Born to Be a Winner', 'Pokemon Theme Jason Paige'], want: ['pokemon'], why: 'Pokémon Johto' },
  'soulcalibur': { queries: ['Soulcalibur character select theme'], want: ['soulcalibur'], why: 'Soulcalibur' },
  'deus ex': { queries: ['Deus Ex Main Theme'], want: ['deus ex'], why: 'Deus Ex theme' },
  'the sims': { queries: ['The Sims Theme'], want: ['sims'], why: 'The Sims theme' },
  'rollercoaster tycoon': { queries: ['RollerCoaster Tycoon Theme'], want: ['rollercoaster tycoon'], why: 'RollerCoaster Tycoon' },
  'jet set radio': { queries: ['Jet Set Radio Hideki Naganuma'], want: ['jet set', 'naganuma'], why: 'Jet Set Radio' },
  'crazy taxi': { queries: ['Crazy Taxi Off the Wall Hideki Naganuma'], want: ['crazy taxi', 'naganuma'], why: 'Crazy Taxi' },
  'chrono cross': { queries: ['Chrono Cross Scars of Time Yasunori Mitsuda'], want: ['chrono cross', 'mitsuda'], why: 'Chrono Cross' },
  'final fantasy viii': { queries: ['Final Fantasy VIII Liberi Fatali Nobuo Uematsu'], want: ['final fantasy viii', 'uematsu'], why: 'Final Fantasy VIII' },
  'streets of rage 2': { queries: ['Streets of Rage 2 Yuzo Koshiro'], want: ['streets', 'rage', 'koshiro'], why: 'Streets of Rage 2' },
  'streets of rage 3': { queries: ['Streets of Rage 3 Yuzo Koshiro'], want: ['streets', 'rage'], why: 'Streets of Rage 3' },
  'comix zone': { queries: ['Comix Zone soundtrack'], want: ['comix', 'zone'], why: 'Comix Zone' },
  'gunstar heroes': { queries: ['Gunstar Heroes Mega Drive'], want: ['gunstar'], why: 'Gunstar Heroes' },
  'phantasy star iv': { queries: ['Phantasy Star IV soundtrack'], want: ['phantasy', 'star'], why: 'Phantasy Star IV' },
  'ecco the dolphin': { queries: ['Ecco the Dolphin theme'], want: ['ecco', 'dolphin'], why: 'Ecco the Dolphin' },
  'vectorman': { queries: ['Vectorman theme'], want: ['vectorman'], why: 'Vectorman' },
  'ristar': { queries: ['Ristar theme'], want: ['ristar'], why: 'Ristar' },
  'f zero': { queries: ['F-Zero Mute City'], want: ['mute', 'city', 'zero'], why: 'F-Zero' },
  'super castlevania iv': { queries: ['Super Castlevania IV Bloody Tears'], want: ['castlevania'], why: 'Super Castlevania IV' },
  'wild guns': { queries: ['Wild Guns soundtrack'], want: ['wild', 'guns'], why: 'Wild Guns' },
  'terranigma': { queries: ['Terranigma soundtrack'], want: ['terranigma'], why: 'Terranigma' },
  'mega man x2': { queries: ['Mega Man X2 Sigma Stage'], want: ['mega', 'man', 'x2'], why: 'Mega Man X2' },
  'mega man x3': { queries: ['Mega Man X3 Zero Theme'], want: ['mega', 'man', 'x3'], why: 'Mega Man X3' },
  'crash bandicoot 2: cortex strikes back': { queries: ['Crash Bandicoot 2 Josh Mancell'], want: ['crash', 'mancell'], why: 'Crash 2' },
  'crash bandicoot: warped': { queries: ['Crash Bandicoot Warped theme'], want: ['crash', 'warped'], why: 'Crash 3' },
  'spyro 2: ripto\'s rage!': { queries: ['Spyro 2 Riptos Rage Stewart Copeland'], want: ['spyro', 'ripto'], why: 'Spyro 2' },
  'spyro: year of the dragon': { queries: ['Spyro Year of the Dragon'], want: ['spyro', 'dragon'], why: 'Spyro 3' },
  'ape escape': { queries: ['Ape Escape theme'], want: ['ape', 'escape'], why: 'Ape Escape' },
  'parappa the rapper': { queries: ['PaRappa the Rapper Chop Chop Master Onion'], want: ['parappa'], why: 'PaRappa' },
  'um jammer lammy': { queries: ['Um Jammer Lammy Fire Fire'], want: ['lammy'], why: 'Um Jammer Lammy' },
  'legend of dragoon': { queries: ['Legend of Dragoon Rose theme'], want: ['dragoon'], why: 'Legend of Dragoon' },
  'final fantasy ix': { queries: ['Final Fantasy IX Melodies of Life'], want: ['final', 'fantasy', 'ix'], why: 'Final Fantasy IX' },
  'suikoden ii': { queries: ['Suikoden II Beautiful Golden Sunshine'], want: ['suikoden'], why: 'Suikoden II' },
  'xenogears': { queries: ['Xenogears Creidos'], want: ['xenogears'], why: 'Xenogears' },
  'vagrant story': { queries: ['Vagrant Story theme'], want: ['vagrant', 'story'], why: 'Vagrant Story' },
  'final fantasy tactics': { queries: ['Final Fantasy Tactics Ovelia and Delita'], want: ['tactics', 'final', 'fantasy'], why: 'Final Fantasy Tactics' },
  'pulp fiction': { queries: ['Misirlou Dick Dale Pulp Fiction'], want: ['misirlou', 'dick', 'dale'], why: 'Misirlou' },
  'good will hunting': { queries: ['Miss Misery Elliott Smith'], want: ['elliott', 'misery'], why: 'Miss Misery' },
  'the prince of egypt': { queries: ['When You Believe Whitney Houston'], want: ['when', 'believe'], why: 'When You Believe' },
  'saving private ryan': { queries: ['Saving Private Ryan Hymn to the Fallen'], want: ['hymn', 'fallen'], why: 'Hymn to the Fallen' },
  'hocus pocus': { queries: ['I Put a Spell on You Bette Midler'], want: ['spell', 'midler'], why: 'I Put a Spell on You' },
  'free willy': { queries: ['Free Willy theme'], want: ['free', 'willy'], why: 'Free Willy' },
  'the crow': { queries: ['The Crow soundtrack Big Empty'], want: ['crow', 'empty'], why: 'The Crow' },
  'rush hour': { queries: ['Rush Hour Chris Tucker theme'], want: ['rush', 'hour'], why: 'Rush Hour' },
  'teenage mutant ninja turtles: turtles in time': { queries: ['Teenage Mutant Ninja Turtles Turtles in Time'], want: ['turtles', 'time'], why: 'Turtles in Time' },
  'the simpsons arcade game': { queries: ['The Simpsons Arcade Game theme'], want: ['simpsons', 'arcade'], why: 'Simpsons Arcade' },
  'tekken 2': { queries: ['Tekken 2 opening'], want: ['tekken'], why: 'Tekken 2' },
  'time crisis': { queries: ['Time Crisis theme'], want: ['time', 'crisis'], why: 'Time Crisis' },
  'the house of the dead': { queries: ['The House of the Dead theme'], want: ['house', 'dead'], why: 'House of the Dead' },
  'nicktoons racing': { queries: ['Nicktoons Racing theme'], want: ['nicktoons'], why: 'Nicktoons Racing' },
  'rugrats: search for reptar': { queries: ['Rugrats Search for Reptar'], want: ['rugrats', 'reptar'], why: 'Search for Reptar' },
  'superman: the animated series': { queries: ['Superman The Animated Series theme Shirley Walker'], want: ['superman', 'walker'], why: 'Superman TAS' },
  'batman beyond': { queries: ['Batman Beyond Theme Shirley Walker'], want: ['batman', 'beyond'], why: 'Batman Beyond' },
  'digimon adventure': { queries: ['Digimon Theme Paul Gordon'], want: ['digimon'], why: 'Digimon' },
  'teenage mutant ninja turtles': { queries: ['Teenage Mutant Ninja Turtles theme song'], want: ['turtle', 'hero'], why: 'TMNT theme' },
  'goof troop': { queries: ['Goof Troop theme'], want: ['goof', 'troop'], why: 'Goof Troop' },
  'where on earth is carmen sandiego?': { queries: ['Carmen Sandiego theme Rockapella'], want: ['rockapella', 'carmen'], why: 'Carmen Sandiego' },
  'street sharks': { queries: ['Street Sharks theme'], want: ['street', 'sharks'], why: 'Street Sharks' },
  'swat kats: the radical squadron': { queries: ['SWAT Kats theme'], want: ['swat', 'kats'], why: 'SWAT Kats' },
  'mrs. doubtfire': { queries: ['Dude Looks Like a Lady Aerosmith Mrs Doubtfire'], want: ['aerosmith', 'dude'], why: 'Dude Looks Like a Lady' },
  'the sandlot': { queries: ['The Sandlot soundtrack The Lion Sleeps Tonight'], want: ['lion', 'sleeps'], why: 'The Sandlot' },
  'jumanji': { queries: ['Jumanji soundtrack Alan Silvestri'], want: ['jumanji', 'silvestri'], why: 'Jumanji theme' },
  'daria': { queries: ['Daria theme song Splendora Youre Standing on My Neck'], want: ['splendora', 'neck'], why: 'Daria theme' },
  'doom': { queries: ['Doom E1M1 At Dooms Gate Bobby Prince'], want: ['doom', 'e1m1', 'prince'], why: 'At Doom\'s Gate' },
  'half-life': { queries: ['Half-Life Hazard Course Kelly Bailey'], want: ['half', 'life', 'bailey'], why: 'Half-Life' },
  'silent hill': { queries: ['Silent Hill Theme Akira Yamaoka'], want: ['silent', 'hill', 'yamaoka'], why: 'Silent Hill' },
  'starcraft': { queries: ['StarCraft Terran Theme Glenn Stafford'], want: ['starcraft', 'terran'], why: 'StarCraft Terran' },
  'quake': { queries: ['Quake soundtrack Nine Inch Nails'], want: ['quake', 'nails'], why: 'Quake' },
  'tomb raider': { queries: ['Tomb Raider theme Nathan McCree'], want: ['tomb', 'raider', 'mccree'], why: 'Tomb Raider' },
  'star fox 64': { queries: ['Star Fox 64 Corneria Hajime Wakai'], want: ['star', 'fox', 'corneria'], why: 'Corneria' },
  'tekken 3': { queries: ['Tekken 3 opening theme'], want: ['tekken'], why: 'Tekken 3' },
  'mario party': { queries: ['Mario Party theme Yasunori Mitsuda'], want: ['mario', 'party'], why: 'Mario Party' },
  'matilda': { queries: ['Matilda soundtrack Send Me On My Way Rusted Root'], want: ['rusted', 'root'], why: 'Send Me On My Way' },
  'the mummy': { queries: ['The Mummy Returns soundtrack Jerry Goldsmith'], want: ['mummy', 'goldsmith'], why: 'The Mummy' },
  'twister': { queries: ['Twister soundtrack Van Halen Humans Being'], want: ['twister', 'van', 'halen'], why: 'Twister' },
  'babe': { queries: ['Babe soundtrack If I Had Words'], want: ['babe', 'words'], why: 'If I Had Words' },
  'casper': { queries: ['Casper soundtrack Remember Me This Way'], want: ['casper', 'remember'], why: 'Casper' },
  'ace ventura: when nature calls': { queries: ['Ace Ventura When Nature Calls soundtrack'], want: ['ace', 'ventura'], why: 'Ace Ventura' },
  'the hunchback of notre dame': { queries: ['Hellfire Hunchback of Notre Dame'], want: ['hellfire', 'hunchback'], why: 'Hellfire' },
  'super soaker': { queries: ['Super Soaker commercial 90s'], want: ['super', 'soaker'], why: 'Super Soaker' },
  'bagel bites': { queries: ['Bagel Bites jingle pizza on a bagel'], want: ['bagel', 'bites'], why: 'Bagel Bites' },
  'skip-it': { queries: ['Skip It commercial jingle'], want: ['skip'], why: 'Skip-It' },
  'surge': { queries: ['Surge soda commercial 90s'], want: ['surge'], why: 'Surge' },
  'tamagotchi': { queries: ['Tamagotchi theme song'], want: ['tamagotchi'], why: 'Tamagotchi' },
  'furby': { queries: ['Furbish Furbish Furbish Furby song'], want: ['furby'], why: 'Furby' },

  // fads
  'game boy': { queries: ['Tetris Theme Type A Hirokazu Tanaka'], want: ['tetris'], why: 'Tetris' },
  'super nintendo': { queries: ['Super Mario World Athletic Koji Kondo'], want: ['mario', 'kondo'], why: 'Super Mario World' },
  'sega genesis': { queries: ['Green Hill Zone Masato Nakamura'], want: ['green hill', 'nakamura'], why: 'Green Hill Zone' },
  'x-men figures': { queries: ['X-Men Animated Series theme Ron Wasserman'], want: ['x-men'], why: 'X-Men theme' },
  'mighty morphin power rangers figures': { queries: ['Go Go Power Rangers Ron Wasserman'], want: ['wasserman', 'power ranger'], why: 'Go Go Power Rangers' },
  'windows 95': { queries: ['Start Me Up Rolling Stones'], want: ['rolling stones', 'start me up'], why: 'Start Me Up' },
  'nintendo 64': { queries: ['Bob-omb Battlefield Koji Kondo Super Mario 64'], want: ['mario'], why: 'Mario 64' },
  'tickle me elmo': { queries: ['Sesame Street Theme'], want: ['sesame'], why: 'Sesame Street' },
  'sony playstation': { queries: ['N Sanity Beach Crash Bandicoot'], want: ['crash'], why: 'Crash Bandicoot' },
  'pokémon trading cards': { queries: ['Pokemon Theme Jason Paige'], want: ['jason paige', 'pokemon'], why: 'Pokémon theme' },
  'barbie dream house': { queries: ['Barbie Girl Aqua'], want: ['aqua', 'barbie girl'], why: 'Barbie Girl' },
  'spice girls dolls': { queries: ['Wannabe Spice Girls'], want: ['spice girls', 'wannabe'], why: 'Wannabe' },
  'nokia 3310': { queries: ['Nokia Tune Gran Vals'], want: ['nokia'], why: 'Nokia Tune' },
  'gak': { queries: ['Nickelodeon theme song original'], want: ['nickelodeon'], why: 'Nickelodeon' },
};

function norm(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const CUE_MAP = Object.fromEntries(Object.entries(CUES).map(([k, v]) => [norm(k), v]));

function musicCue(item) {
  const artistBits = norm(item.meta).split(' ').filter((w) => w.length > 2 && !['the', 'and'].includes(w));
  if (!artistBits.length) return null;
  return {
    queries: [`${item.title} ${item.meta}`, `${item.meta} ${item.title}`, item.title],
    want: [...artistBits, ...norm(item.title).split(' ').filter((w) => w.length > 2)].slice(0, 8),
    why: item.title,
  };
}

function autoCue(item) {
  if (!item.cue || item.cue.length < 10) return null;
  const want = item.cue.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  if (want.length < 2) return null;
  return {
    queries: [item.cue, `${item.title} ${item.cue}`, `${item.cue} original`],
    want: want.slice(0, 8),
    why: item.cue.split(' ').slice(0, 4).join(' '),
  };
}

export function cueFor(item) {
  if (CUE_MAP[norm(item.title)]) return CUE_MAP[norm(item.title)];
  if (item.cat === 'music') return musicCue(item);
  return autoCue(item);
}

/** Slides without a real cue path never enter the deck. */
export function playableItem(item) {
  if (item.cat === 'music') return Boolean(musicCue(item));
  if (CUE_MAP[norm(item.title)]) return true;
  return Boolean(autoCue(item));
}

export function queriesFor(item) {
  const cue = cueFor(item);
  return cue?.queries?.length ? cue.queries : [];
}

function blobOf(t) {
  return `${t.trackName} ${t.artistName} ${t.collectionName}`.toLowerCase();
}

function isJunk(t) {
  return JUNK.test(blobOf(t));
}

export function pickTrack(results, item) {
  const cue = cueFor(item);
  const want = (cue?.want || []).map((w) => String(w).toLowerCase());
  const titleBits = norm(item.title).split(' ').filter((w) => w.length > 2);
  const hits = (results || []).filter((t) => t.previewUrl && !isJunk(t));
  if (!hits.length) return null;

  const scored = hits.map((t) => {
    const blob = blobOf(t);
    let score = 0;
    want.forEach((w) => { if (w && blob.includes(w)) score += 5; });
    titleBits.forEach((w) => { if (blob.includes(w)) score += 1; });
    if (/original soundtrack|official|theme song|main title/.test(blob)) score += 2;

    if (item.cat === 'music') {
      const artistBits = norm(item.meta).split(' ').filter((w) => w.length > 2 && !['the', 'and'].includes(w));
      const artistHits = artistBits.filter((w) => blob.includes(w)).length;
      if (artistBits.length && !artistHits) score = -99;
      else score += artistHits * 6;
      if (blob.includes(norm(item.title).slice(0, 16))) score += 6;
      if (score < 8) score = -99;
    } else if (cue) {
      const wantHits = want.filter((w) => w && blob.includes(w)).length;
      if (!wantHits) score = -99;
      if (want.length >= 2 && wantHits < 1) score = -99;
      if (want.length >= 3 && wantHits < 2) score = -99;
    } else {
      score = -99;
    }
    return { t, score };
  }).filter((row) => row.score >= 6);

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.t || null;
}

export function labelFor(track, item) {
  const cue = cueFor(item);
  if (cue?.why) return `${cue.why} · ${track.artistName}`;
  return `${track.artistName} — ${track.trackName}`;
}
