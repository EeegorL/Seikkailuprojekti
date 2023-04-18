# Seikkailupeli - Keskiverto päivä Itäkeskuksessa
## Pelin käynnistäminen ja askeleet ennen sitä:

### Asennus
-   Peli vaatii toimiakseen MariaDB-tietokannan (tai vastaavan)
-   Käyttäjän tulee olla kirjautunut MariaDB-ympäristössä (tai vastaavassa) riittävän valtuutetulla käyttäjällä, jolla on oikeudet tietokannan luontiin
-   Pelin pelivalmiuteen asentaminen hoituu puskemalla pelin tietovarasto-kansion ***seikkailupeli.sql***:n sisältö MariaDB-päätteeseen, joka luo tietokannan, tietotaulut, ja syöttää niihin pelin tiedot


### Käynnistys
-   Asennuksen ollen valmis, pelin saa käynnistettyä navigoimalla pelin kansioon jollakin ohjelman ajokykyisellä päätteellä ja komennolla ***node index***. Jos peli käynnistyy, pääte vastaa viestillä "*localhost:3000 kuuntelee korvat höröllä*"
-   ***HUOM!***, pelin käyttäen porttia localhost:3000, kyseisen portin tulee olla vapaa pelin aikana, sillä vain yksi ohjelma voi käyttää yhtä porttia samanaikaisesti

### Pelaaminen
-   Kun asennus on valmis, peli on valmis pelattavaksi. Pelisivu sisältää ohjeet ohjaukseen ja pelissä käytettyihin näppäimiin
-   Pelin sisällä ei tätä mainita, mutta pelaaja ***ei*** pysty liikkumaan huoneiden välillä, jos pelaajan tämänhetkisessä huoneessa on vihollisia. Tämä sitä varten, ettei pelaaja pystyisi juoksemaan vihollisten ohi suoraan lompakkovarkaan luo
-   Pelin edistyminen ei tallennu, vaan peli alkaa alusta jokaisen pelaajan kuoleman jälkeen, joko ***Aloita uusi peli***-nappia painamalla tai vain sivun "refreshaamalla"

### Tunnetut ongelmat
-   Pelin ollen kehityksessä/prototyyppi, päihitetyt viholliset syntyvät takaisin eloon ne päihitettyä kun pelaaja siirtyy huoneesta toiseen, eli jos pelaaja päihittää vihollisen, siirtyy seuraavaan huoneeseen, ja sen jälkeen päättää palata edelliseen huoneeseen, sen viholliset tulevat olemaan taas pystyssä. Syynä ohjelman ylikuormittumisen estäminen, jonka aiheuttaisi viholliset poistava funktio.
-   Toinen tunnettu ongelma pelissä on ylikuormittuminen ajan myötä. Asian testaamisesta on aikaa, mutta viimeisellä tarkistuksella pelin hidastuminen ja lopulta pelaamiskelvottomaksi tuleminen tapahtuu muutaman minuutin kuluttua pelin alusta . Asiaa ei ole tarkistettu pitkään aikaan, joten muutaman minuutin arvio voi hyvinkin olla väärin ja olla pienempi, tai ongelma saattaa olla jopa ratkaistu. Mahdollisesta "aikarajoituksesta" huolimatta pelin pystyy kuitenkin pelaamaan läpi ennen kuin mitään huomattavaa pelin laadun degradaatiota tapahtuu, jos pelaaja tietää mitä tekee (ei mitenkään pahalla)
-   Ääkköset eivät toimi, vaan SQL kääntää ne kaikki "?"-merkeiksi, jonka takia nimet ja tekstit näyttävät huonolta. Oli yritetty korjata collation-komennoilla ja utf-tyypin muuttamisella mutta ei auttanut sekään



Peli:
https://github.com/EeegorL/Seikkailuprojekti
