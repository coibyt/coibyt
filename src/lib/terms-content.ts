// Terms of Use text per locale. `**bold**` marks the legal-entity details.
// Non-vi/en versions are translations of the same 12 sections — keep the
// section order and count identical across locales when editing.
export interface TermsSection {
  title: string;
  paragraphs: string[];
}

export interface TermsContent {
  title: string;
  updated: string;
  sections: TermsSection[];
  businessIdLabel: string;
  addressLabel: string;
}

const ENTITY_ADDRESS = "Hakaniemen torikatu 2 L 48, 00530 Helsinki";

export const TERMS: Record<string, TermsContent> = {
  vi: {
    title: "Điều khoản sử dụng",
    updated: "Cập nhật lần cuối: 25/09/2026",
    businessIdLabel: "Mã số doanh nghiệp",
    addressLabel: "Địa chỉ",
    sections: [
      {
        title: "1. Giới thiệu chung",
        paragraphs: [
          "Vui lòng đọc kỹ Điều khoản sử dụng này (“Điều khoản”). Bằng việc đăng ký tài khoản, đặt lịch hẹn, hoặc sử dụng bất kỳ tính năng nào của website VaraaAi.Com (“Dịch vụ VaraaAi”), bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản này.",
          "Đơn vị phát triển và sở hữu Dịch vụ VaraaAi là **Moja Investors Oy** (“VaraaAi”, “chúng tôi”), mã số doanh nghiệp **3555331-8**, có địa chỉ tại **Hakaniemen torikatu 2 L 48, 00530 Helsinki**, email liên hệ **info@varaaAi.com**.",
          "Nếu bạn chưa đủ 18 tuổi, bạn cần có sự đồng ý của người giám hộ hợp pháp trước khi chấp nhận các Điều khoản này. Nếu bạn không đồng ý với Điều khoản, hoặc không có quyền đại diện cho tổ chức mà bạn đang thay mặt, bạn không được phép sử dụng Dịch vụ VaraaAi.",
        ],
      },
      {
        title: "2. Cách thức hoạt động của dịch vụ",
        paragraphs: [
          "VaraaAi vận hành một nền tảng trực tuyến kết nối khách hàng (“Bạn”) với các salon, tiệm nail, spa và các đơn vị cung cấp dịch vụ làm đẹp độc lập (“Đối tác”) để đặt lịch hẹn. VaraaAi không tự mình cung cấp hay bán các dịch vụ làm đẹp — Đối tác là bên độc lập tự đăng, quản lý và chịu trách nhiệm về dịch vụ, giá cả và lịch làm việc của mình trên nền tảng.",
          "Điều khoản này chỉ ràng buộc giữa Bạn và VaraaAi. Việc đặt lịch qua VaraaAi đồng nghĩa với việc Bạn cũng đồng ý với các điều kiện đặt lịch, chính sách hủy riêng của Đối tác mà Bạn đặt lịch, được hiển thị tại thời điểm đặt lịch.",
          "Trong một số trường hợp, VaraaAi cho phép Bạn thanh toán trước cho Đối tác ngay trên nền tảng thông qua đơn vị trung gian thanh toán do VaraaAi lựa chọn. Trong trường hợp này, VaraaAi (hoặc đơn vị trung gian thanh toán) chỉ đóng vai trò chuyển khoản thanh toán đến Đối tác, không phải là bên bán dịch vụ.",
          "VaraaAi có quyền thay đổi, bổ sung hoặc ngừng cung cấp bất kỳ tính năng nào của Dịch vụ VaraaAi vào bất kỳ thời điểm nào.",
        ],
      },
      {
        title: "3. Quyền và nghĩa vụ khi sử dụng dịch vụ",
        paragraphs: [
          "Bạn cam kết chỉ sử dụng Dịch vụ VaraaAi cho đúng mục đích mà nó được thiết kế: tìm kiếm và đặt lịch hẹn làm đẹp, hoặc — nếu bạn là chủ salon — quản lý dịch vụ và lịch hẹn của salon mình. Nghiêm cấm sử dụng Dịch vụ VaraaAi cho mục đích bất hợp pháp, gian lận, hoặc cạnh tranh không lành mạnh.",
          "Bạn cam kết cung cấp thông tin chính xác, trung thực khi đăng ký tài khoản và đặt lịch hẹn, và không đăng tải hay chia sẻ nội dung trái pháp luật hoặc trái thuần phong mỹ tục thông qua Dịch vụ VaraaAi.",
          "VaraaAi có quyền tạm ngừng hoặc chấm dứt quyền truy cập của Bạn vào Dịch vụ VaraaAi nếu VaraaAi có cơ sở cho rằng Bạn vi phạm Điều khoản này, pháp luật hiện hành, hoặc khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.",
        ],
      },
      {
        title: "4. Đặt lịch, dời lịch và hủy lịch",
        paragraphs: [
          "Khi Bạn đặt lịch hẹn qua VaraaAi, Bạn đồng thời đồng ý với chính sách hủy lịch riêng của Đối tác đó, được hiển thị trước khi Bạn xác nhận đặt lịch. Chính sách hủy lịch có thể khác nhau tùy theo từng salon.",
          "Bạn có thể tự hủy hoặc theo dõi lịch hẹn của mình trong mục “Lịch hẹn của tôi” trên tài khoản VaraaAi, trong phạm vi thời gian mà chính sách hủy của Đối tác cho phép. Ngoài phạm vi đó, vui lòng liên hệ trực tiếp với salon.",
          "Đối tác có quyền chủ động dời lịch hẹn của Bạn sang thời gian khác khi cần thiết; trong trường hợp này Bạn sẽ nhận được email thông báo tự động với thời gian mới.",
        ],
      },
      {
        title: "5. Thanh toán",
        paragraphs: [
          "Tùy theo từng salon, Bạn có thể thanh toán trực tiếp tại salon (tiền mặt hoặc thẻ), chuyển khoản ngân hàng theo thông tin salon cung cấp, hoặc — nếu salon bật tính năng này — thanh toán trực tuyến ngay trên VaraaAi thông qua đơn vị trung gian thanh toán.",
          "VaraaAi không giữ lại bất kỳ khoản phí nào từ khách hàng khi đặt lịch; toàn bộ số tiền thanh toán trực tuyến (nếu có) được chuyển đến Đối tác thông qua đơn vị trung gian thanh toán.",
        ],
      },
      {
        title: "6. Quyền riêng tư",
        paragraphs: [
          "Khi sử dụng Dịch vụ VaraaAi, Bạn cung cấp cho VaraaAi một số thông tin cá nhân trên cơ sở sự đồng ý của Bạn. Thông tin liên quan đến lịch hẹn của Bạn (họ tên, số điện thoại, email, ghi chú) sẽ được chia sẻ với Đối tác mà Bạn đặt lịch để Đối tác có thể phục vụ Bạn.",
          "VaraaAi sử dụng dữ liệu phát sinh từ việc sử dụng Dịch vụ để vận hành, khắc phục sự cố, cải thiện Dịch vụ, và — nếu Bạn đã đồng ý — cho mục đích tiếp thị. Bạn có thể yêu cầu xóa tài khoản và dữ liệu cá nhân của mình bất kỳ lúc nào bằng cách liên hệ **info@varaaAi.com**.",
        ],
      },
      {
        title: "7. Trách nhiệm và giới hạn trách nhiệm",
        paragraphs: [
          "VaraaAi không chịu trách nhiệm về nội dung, chất lượng, sự an toàn, hay bất kỳ khía cạnh nào khác của dịch vụ do Đối tác cung cấp. Mọi khiếu nại liên quan đến dịch vụ đã đặt (như chất lượng dịch vụ, việc hủy hay dời lịch) cần được gửi trực tiếp đến Đối tác.",
          "Dịch vụ VaraaAi được cung cấp trên cơ sở “nguyên trạng”. VaraaAi không đảm bảo Dịch vụ VaraaAi hoạt động liên tục, không lỗi, hay hoàn toàn không có sự cố kỹ thuật, và không chịu trách nhiệm về thiệt hại phát sinh trực tiếp hoặc gián tiếp từ việc sử dụng Dịch vụ VaraaAi hoặc dịch vụ của Đối tác.",
        ],
      },
      {
        title: "8. Sở hữu trí tuệ",
        paragraphs: [
          "Toàn bộ quyền sở hữu và quyền sở hữu trí tuệ đối với Dịch vụ VaraaAi thuộc về Moja Investors Oy hoặc các đối tác cấp phép của Moja Investors Oy.",
        ],
      },
      {
        title: "9. Hiệu lực và thay đổi điều khoản",
        paragraphs: [
          "Bạn có thể ngừng sử dụng Dịch vụ VaraaAi bất kỳ lúc nào bằng cách yêu cầu xóa tài khoản. VaraaAi có thể tạm ngừng hoặc chấm dứt quyền truy cập của Bạn nếu có lý do chính đáng.",
          "VaraaAi có thể sửa đổi Điều khoản này vào bất kỳ lúc nào. Việc Bạn tiếp tục sử dụng Dịch vụ VaraaAi sau khi Điều khoản được sửa đổi đồng nghĩa với việc Bạn chấp nhận các thay đổi đó. Nếu không đồng ý, Bạn cần ngừng sử dụng Dịch vụ VaraaAi.",
        ],
      },
      {
        title: "10. Chuyển giao quyền",
        paragraphs: [
          "Moja Investors Oy có quyền chuyển giao Dịch vụ VaraaAi, cũng như các quyền và nghĩa vụ theo Điều khoản này, cho bất kỳ bên thứ ba nào mà không cần sự đồng ý trước của Bạn.",
        ],
      },
      {
        title: "11. Luật áp dụng và giải quyết tranh chấp",
        paragraphs: [
          "Điều khoản này chịu sự điều chỉnh của pháp luật Phần Lan. Mọi tranh chấp phát sinh trước tiên sẽ được giải quyết thông qua thương lượng thiện chí. Nếu không đạt được thỏa thuận, tranh chấp có thể được đưa ra giải quyết tại Tòa án quận Helsinki (Helsingin käräjäoikeus) là tòa án có thẩm quyền đầu tiên.",
          "Đối với khách hàng là người tiêu dùng, các quyền bắt buộc theo pháp luật bảo vệ người tiêu dùng tại nơi cư trú của Bạn vẫn được áp dụng và không bị hạn chế bởi Điều khoản này.",
        ],
      },
      { title: "12. Liên hệ", paragraphs: [] },
    ],
  },
  en: {
    title: "Terms of Use",
    updated: "Last updated: 25 September 2026",
    businessIdLabel: "Business ID",
    addressLabel: "Address",
    sections: [
      {
        title: "1. General",
        paragraphs: [
          "Please read these Terms of Use (the “Terms”) carefully. By creating an account, booking an appointment, or using any feature of the VaraaAi.Com website (the “VaraaAi Service”), you confirm that you have read, understood and agree to be bound by these Terms.",
          "The VaraaAi Service is developed and owned by **Moja Investors Oy** (“VaraaAi”, “we”), business ID **3555331-8**, registered at **Hakaniemen torikatu 2 L 48, 00530 Helsinki, Finland**, contact email **info@varaaAi.com**.",
          "If you are under 18, you must have your legal guardian’s consent before accepting these Terms. If you do not agree to the Terms, or you are not authorized to act on behalf of the organization you represent, you may not use the VaraaAi Service.",
        ],
      },
      {
        title: "2. How the service works",
        paragraphs: [
          "VaraaAi operates an online platform that connects customers (“you”) with independent salons, nail bars, spas and other beauty service providers (“Partners”) for the purpose of booking appointments. VaraaAi does not itself provide or sell any beauty service — each Partner independently lists, manages and is responsible for its own services, prices and schedule on the platform.",
          "These Terms bind only you and VaraaAi. Booking through VaraaAi also means you agree to the individual booking conditions and cancellation policy of the Partner you booked with, as shown to you at the time of booking.",
          "In some cases, VaraaAi lets you pay a Partner in advance directly on the platform through a payment processor chosen by VaraaAi. In that case, VaraaAi (or its payment processor) only forwards the payment to the Partner and is not the seller of the service.",
          "VaraaAi may change, add to, or discontinue any feature of the VaraaAi Service at any time.",
        ],
      },
      {
        title: "3. Your rights and obligations",
        paragraphs: [
          "You agree to use the VaraaAi Service only for its intended purpose: finding and booking beauty appointments, or — if you are a salon owner — managing your salon’s services and bookings. Using the VaraaAi Service for any unlawful, fraudulent, or unfair-competition purpose is strictly prohibited.",
          "You agree to provide accurate and truthful information when registering an account and booking an appointment, and not to upload or share unlawful or offensive content through the VaraaAi Service.",
          "VaraaAi may suspend or terminate your access to the VaraaAi Service if VaraaAi has reasonable grounds to believe you have violated these Terms, applicable law, or when required to do so by a competent authority.",
        ],
      },
      {
        title: "4. Booking, rescheduling and cancellation",
        paragraphs: [
          "When you book an appointment through VaraaAi, you also agree to that Partner’s own cancellation policy, shown to you before you confirm the booking. Cancellation policies may differ between salons.",
          "You can cancel or track your own appointments under “My bookings” in your VaraaAi account, within whatever window the Partner’s cancellation policy allows. Outside that window, please contact the salon directly.",
          "A Partner may reschedule your appointment to a different time when necessary; if this happens, you will receive an automatic email notification with the new time.",
        ],
      },
      {
        title: "5. Payment",
        paragraphs: [
          "Depending on the salon, you may pay directly at the salon (cash or card), by bank transfer using the details the salon provides, or — where the salon has enabled it — online directly on VaraaAi through a payment processor.",
          "VaraaAi does not withhold any fee from customers when booking; any amount paid online is forwarded to the Partner through the payment processor.",
        ],
      },
      {
        title: "6. Privacy",
        paragraphs: [
          "By using the VaraaAi Service, you provide VaraaAi with certain personal data based on your consent. Information related to your appointment (name, phone number, email, notes) is shared with the Partner you booked with so they can serve you.",
          "VaraaAi uses data generated from using the Service to operate, troubleshoot and improve the Service, and — where you have consented — for marketing purposes. You may request deletion of your account and personal data at any time by contacting **info@varaaAi.com**.",
        ],
      },
      {
        title: "7. Liability",
        paragraphs: [
          "VaraaAi is not responsible for the content, quality, safety, or any other aspect of the services provided by a Partner. Any complaint about a booked service (such as service quality, cancellation or rescheduling) must be sent directly to the Partner.",
          "The VaraaAi Service is provided on an “as is” basis. VaraaAi does not guarantee uninterrupted, error-free operation of the VaraaAi Service, and is not liable for any direct or indirect damage arising from the use of the VaraaAi Service or a Partner’s services.",
        ],
      },
      {
        title: "8. Intellectual property",
        paragraphs: [
          "All ownership and intellectual property rights in the VaraaAi Service belong to Moja Investors Oy or its licensing partners.",
        ],
      },
      {
        title: "9. Validity and changes to these Terms",
        paragraphs: [
          "You may stop using the VaraaAi Service at any time by requesting deletion of your account. VaraaAi may suspend or terminate your access for good reason.",
          "VaraaAi may amend these Terms at any time. Continuing to use the VaraaAi Service after the Terms have been amended means you accept the changes. If you do not agree, you must stop using the VaraaAi Service.",
        ],
      },
      {
        title: "10. Assignment",
        paragraphs: [
          "Moja Investors Oy may transfer the VaraaAi Service, along with the rights and obligations under these Terms, to any third party without your prior consent.",
        ],
      },
      {
        title: "11. Governing law and dispute resolution",
        paragraphs: [
          "These Terms are governed by the laws of Finland. Any dispute will first be addressed through good-faith negotiation. If no agreement is reached, the dispute may be brought before the Helsinki District Court (Helsingin käräjäoikeus) as the court of first instance.",
          "For consumers, the mandatory consumer-protection rights of your own country of residence still apply and are not limited by these Terms.",
        ],
      },
      { title: "12. Contact", paragraphs: [] },
    ],
  },
  fi: {
    title: "Käyttöehdot",
    updated: "Päivitetty viimeksi: 25. syyskuuta 2026",
    businessIdLabel: "Y-tunnus",
    addressLabel: "Osoite",
    sections: [
      {
        title: "1. Yleistä",
        paragraphs: [
          "Lue nämä käyttöehdot (”Ehdot”) huolellisesti. Luomalla tilin, varaamalla ajan tai käyttämällä mitä tahansa VaraaAi.Com-verkkosivuston ominaisuutta (”VaraaAi-palvelu”) vahvistat lukeneesi ja ymmärtäneesi nämä Ehdot ja sitoutuvasi noudattamaan niitä.",
          "VaraaAi-palvelun on kehittänyt ja omistaa **Moja Investors Oy** (”VaraaAi”, ”me”), y-tunnus **3555331-8**, rekisteröity osoitteessa **Hakaniemen torikatu 2 L 48, 00530 Helsinki, Suomi**, yhteyssähköposti **info@varaaAi.com**.",
          "Jos olet alle 18-vuotias, tarvitset huoltajasi suostumuksen ennen näiden Ehtojen hyväksymistä. Jos et hyväksy Ehtoja tai sinulla ei ole valtuuksia toimia edustamasi organisaation puolesta, et saa käyttää VaraaAi-palvelua.",
        ],
      },
      {
        title: "2. Palvelun toimintatapa",
        paragraphs: [
          "VaraaAi ylläpitää verkkoalustaa, joka yhdistää asiakkaat (”sinä”) itsenäisiin kampaamoihin, kynsistudioihin, kylpylöihin ja muihin kauneuspalvelujen tarjoajiin (”Kumppanit”) ajanvarausta varten. VaraaAi ei itse tarjoa tai myy kauneuspalveluja — jokainen Kumppani listaa, hallinnoi ja vastaa itsenäisesti omista palveluistaan, hinnoistaan ja aikatauluistaan alustalla.",
          "Nämä Ehdot sitovat vain sinua ja VaraaAita. Varaamalla VaraaAin kautta hyväksyt myös sen Kumppanin yksittäiset varausehdot ja peruutuskäytännön, jonka luona varasit, sellaisina kuin ne näytettiin sinulle varauksen yhteydessä.",
          "Joissain tapauksissa VaraaAi antaa sinun maksaa Kumppanille etukäteen suoraan alustalla VaraaAin valitseman maksunvälittäjän kautta. Tällöin VaraaAi (tai sen maksunvälittäjä) vain välittää maksun Kumppanille eikä ole palvelun myyjä.",
          "VaraaAi voi muuttaa, täydentää tai lopettaa minkä tahansa VaraaAi-palvelun ominaisuuden milloin tahansa.",
        ],
      },
      {
        title: "3. Oikeutesi ja velvollisuutesi",
        paragraphs: [
          "Sitoudut käyttämään VaraaAi-palvelua vain sen tarkoitukseen: kauneusaikojen etsimiseen ja varaamiseen tai — jos olet salongin omistaja — salongisi palvelujen ja varausten hallintaan. VaraaAi-palvelun käyttö laittomiin, vilpillisiin tai epäreiluun kilpailuun liittyviin tarkoituksiin on ehdottomasti kielletty.",
          "Sitoudut antamaan oikeat ja totuudenmukaiset tiedot tiliä luodessasi ja aikaa varatessasi sekä olemaan lataamatta tai jakamatta laitonta tai loukkaavaa sisältöä VaraaAi-palvelun kautta.",
          "VaraaAi voi keskeyttää tai päättää pääsysi VaraaAi-palveluun, jos VaraaAilla on perusteltu syy uskoa, että olet rikkonut näitä Ehtoja tai voimassa olevaa lakia, tai jos toimivaltainen viranomainen sitä vaatii.",
        ],
      },
      {
        title: "4. Varaaminen, uudelleenajoitus ja peruuttaminen",
        paragraphs: [
          "Kun varaat ajan VaraaAin kautta, hyväksyt myös kyseisen Kumppanin oman peruutuskäytännön, joka näytetään sinulle ennen varauksen vahvistamista. Peruutuskäytännöt voivat vaihdella salonkien välillä.",
          "Voit perua tai seurata omia aikojasi VaraaAi-tilisi kohdassa ”Varaukseni” sen aikaikkunan puitteissa, jonka Kumppanin peruutuskäytäntö sallii. Sen jälkeen ota yhteyttä suoraan salonkiin.",
          "Kumppani voi tarvittaessa siirtää varauksesi toiseen aikaan; tässä tapauksessa saat automaattisen sähköposti-ilmoituksen uudesta ajasta.",
        ],
      },
      {
        title: "5. Maksu",
        paragraphs: [
          "Salongista riippuen voit maksaa suoraan salongissa (käteisellä tai kortilla), tilisiirrolla salongin antamilla tiedoilla tai — jos salonki on ottanut sen käyttöön — verkossa suoraan VaraaAissa maksunvälittäjän kautta.",
          "VaraaAi ei pidätä asiakkailta mitään maksua varattaessa; kaikki verkossa maksetut summat välitetään Kumppanille maksunvälittäjän kautta.",
        ],
      },
      {
        title: "6. Tietosuoja",
        paragraphs: [
          "Käyttäessäsi VaraaAi-palvelua annat VaraaAille tiettyjä henkilötietoja suostumuksesi perusteella. Varaukseesi liittyvät tiedot (nimi, puhelinnumero, sähköposti, huomautukset) jaetaan sen Kumppanin kanssa, jonka luona varasit, jotta hän voi palvella sinua.",
          "VaraaAi käyttää palvelun käytöstä syntyvää dataa palvelun ylläpitoon, vianetsintään ja parantamiseen sekä — jos olet suostunut — markkinointitarkoituksiin. Voit pyytää tilisi ja henkilötietojesi poistamista milloin tahansa ottamalla yhteyttä osoitteeseen **info@varaaAi.com**.",
        ],
      },
      {
        title: "7. Vastuu",
        paragraphs: [
          "VaraaAi ei vastaa Kumppanin tarjoamien palvelujen sisällöstä, laadusta, turvallisuudesta tai muusta näkökohdasta. Kaikki varattua palvelua koskevat valitukset (kuten palvelun laatu, peruutus tai uudelleenajoitus) on osoitettava suoraan Kumppanille.",
          "VaraaAi-palvelu tarjotaan ”sellaisenaan”. VaraaAi ei takaa VaraaAi-palvelun keskeytyksetöntä tai virheetöntä toimintaa, eikä vastaa suorista tai välillisistä vahingoista, jotka aiheutuvat VaraaAi-palvelun tai Kumppanin palvelujen käytöstä.",
        ],
      },
      {
        title: "8. Immateriaalioikeudet",
        paragraphs: [
          "Kaikki VaraaAi-palvelun omistus- ja immateriaalioikeudet kuuluvat Moja Investors Oy:lle tai sen lisenssinantajille.",
        ],
      },
      {
        title: "9. Voimassaolo ja ehtojen muutokset",
        paragraphs: [
          "Voit lopettaa VaraaAi-palvelun käytön milloin tahansa pyytämällä tilisi poistamista. VaraaAi voi keskeyttää tai päättää pääsysi perustellusta syystä.",
          "VaraaAi voi muuttaa näitä Ehtoja milloin tahansa. VaraaAi-palvelun jatkuva käyttö Ehtojen muuttamisen jälkeen tarkoittaa, että hyväksyt muutokset. Jos et hyväksy niitä, sinun on lopetettava VaraaAi-palvelun käyttö.",
        ],
      },
      {
        title: "10. Oikeuksien siirto",
        paragraphs: [
          "Moja Investors Oy voi siirtää VaraaAi-palvelun sekä näiden Ehtojen mukaiset oikeudet ja velvollisuudet kolmannelle osapuolelle ilman etukäteissuostumustasi.",
        ],
      },
      {
        title: "11. Sovellettava laki ja riidanratkaisu",
        paragraphs: [
          "Näihin Ehtoihin sovelletaan Suomen lakia. Riidat ratkaistaan ensin vilpittömässä mielessä neuvottelemalla. Jos sopimukseen ei päästä, riita voidaan viedä Helsingin käräjäoikeuteen ensimmäisenä oikeusasteena.",
          "Kuluttajien osalta oman asuinmaasi pakottavat kuluttajansuojaoikeudet pysyvät voimassa, eikä näillä Ehdoilla rajoiteta niitä.",
        ],
      },
      { title: "12. Yhteystiedot", paragraphs: [] },
    ],
  },
  pl: {
    title: "Warunki korzystania",
    updated: "Ostatnia aktualizacja: 25 września 2026",
    businessIdLabel: "Numer identyfikacyjny firmy",
    addressLabel: "Adres",
    sections: [
      {
        title: "1. Postanowienia ogólne",
        paragraphs: [
          "Prosimy o uważne przeczytanie niniejszych Warunków korzystania („Warunki”). Zakładając konto, rezerwując wizytę lub korzystając z jakiejkolwiek funkcji serwisu VaraaAi.Com („Usługa VaraaAi”), potwierdzasz, że przeczytałeś(-aś) i zrozumiałeś(-aś) te Warunki oraz zgadzasz się być nimi związany(-a).",
          "Usługa VaraaAi jest rozwijana i należy do **Moja Investors Oy** („VaraaAi”, „my”), numer identyfikacyjny firmy **3555331-8**, z siedzibą pod adresem **Hakaniemen torikatu 2 L 48, 00530 Helsinki, Finlandia**, e-mail kontaktowy **info@varaaAi.com**.",
          "Jeśli masz mniej niż 18 lat, przed zaakceptowaniem Warunków musisz uzyskać zgodę swojego opiekuna prawnego. Jeśli nie zgadzasz się z Warunkami lub nie masz uprawnień do działania w imieniu reprezentowanej organizacji, nie możesz korzystać z Usługi VaraaAi.",
        ],
      },
      {
        title: "2. Jak działa usługa",
        paragraphs: [
          "VaraaAi prowadzi platformę internetową łączącą klientów („Ty”) z niezależnymi salonami fryzjerskimi, salonami paznokci, spa i innymi usługodawcami z branży beauty („Partnerzy”) w celu rezerwacji wizyt. VaraaAi samo nie świadczy ani nie sprzedaje usług kosmetycznych — każdy Partner samodzielnie wystawia, zarządza i odpowiada za swoje usługi, ceny i harmonogram na platformie.",
          "Niniejsze Warunki wiążą wyłącznie Ciebie i VaraaAi. Rezerwacja przez VaraaAi oznacza również akceptację indywidualnych warunków rezerwacji i polityki anulowania Partnera, u którego rezerwujesz, przedstawionych Ci w momencie rezerwacji.",
          "W niektórych przypadkach VaraaAi umożliwia opłacenie usługi Partnerowi z góry bezpośrednio na platformie za pośrednictwem operatora płatności wybranego przez VaraaAi. W takim przypadku VaraaAi (lub jego operator płatności) jedynie przekazuje płatność Partnerowi i nie jest sprzedawcą usługi.",
          "VaraaAi może w dowolnym momencie zmieniać, uzupełniać lub wycofywać dowolną funkcję Usługi VaraaAi.",
        ],
      },
      {
        title: "3. Twoje prawa i obowiązki",
        paragraphs: [
          "Zobowiązujesz się korzystać z Usługi VaraaAi wyłącznie zgodnie z jej przeznaczeniem: wyszukiwania i rezerwowania wizyt beauty lub — jeśli jesteś właścicielem salonu — zarządzania usługami i rezerwacjami swojego salonu. Wykorzystywanie Usługi VaraaAi do celów niezgodnych z prawem, oszukańczych lub stanowiących nieuczciwą konkurencję jest surowo zabronione.",
          "Zobowiązujesz się podawać prawdziwe i dokładne informacje podczas zakładania konta i rezerwacji wizyty oraz nie zamieszczać ani nie udostępniać za pośrednictwem Usługi VaraaAi treści niezgodnych z prawem lub obraźliwych.",
          "VaraaAi może zawiesić lub zakończyć Twój dostęp do Usługi VaraaAi, jeśli ma uzasadnione podstawy, by sądzić, że naruszyłeś(-aś) niniejsze Warunki lub obowiązujące prawo, albo gdy wymaga tego właściwy organ.",
        ],
      },
      {
        title: "4. Rezerwacja, zmiana terminu i anulowanie",
        paragraphs: [
          "Rezerwując wizytę przez VaraaAi, akceptujesz również politykę anulowania danego Partnera, wyświetlaną przed potwierdzeniem rezerwacji. Polityki anulowania mogą się różnić w zależności od salonu.",
          "Możesz anulować lub śledzić własne wizyty w sekcji „Moje rezerwacje” na swoim koncie VaraaAi, w ramach okna czasowego dozwolonego przez politykę anulowania Partnera. Poza tym oknem skontaktuj się bezpośrednio z salonem.",
          "Partner może w razie potrzeby przełożyć Twoją wizytę na inny termin; w takim przypadku otrzymasz automatyczne powiadomienie e-mail z nowym terminem.",
        ],
      },
      {
        title: "5. Płatność",
        paragraphs: [
          "W zależności od salonu możesz zapłacić bezpośrednio w salonie (gotówką lub kartą), przelewem bankowym na dane podane przez salon lub — jeśli salon to włączył — online bezpośrednio w VaraaAi za pośrednictwem operatora płatności.",
          "VaraaAi nie pobiera od klientów żadnych opłat przy rezerwacji; każda kwota zapłacona online jest przekazywana Partnerowi za pośrednictwem operatora płatności.",
        ],
      },
      {
        title: "6. Prywatność",
        paragraphs: [
          "Korzystając z Usługi VaraaAi, przekazujesz VaraaAi określone dane osobowe na podstawie swojej zgody. Informacje związane z Twoją wizytą (imię i nazwisko, numer telefonu, e-mail, uwagi) są udostępniane Partnerowi, u którego rezerwujesz, aby mógł Cię obsłużyć.",
          "VaraaAi wykorzystuje dane generowane podczas korzystania z Usługi do jej prowadzenia, rozwiązywania problemów i ulepszania oraz — jeśli wyraziłeś(-aś) zgodę — do celów marketingowych. Możesz w każdej chwili zażądać usunięcia konta i danych osobowych, kontaktując się pod adresem **info@varaaAi.com**.",
        ],
      },
      {
        title: "7. Odpowiedzialność",
        paragraphs: [
          "VaraaAi nie odpowiada za treść, jakość, bezpieczeństwo ani żaden inny aspekt usług świadczonych przez Partnera. Wszelkie reklamacje dotyczące zarezerwowanej usługi (takie jak jakość usługi, anulowanie lub zmiana terminu) należy kierować bezpośrednio do Partnera.",
          "Usługa VaraaAi jest świadczona w stanie „takim, jaki jest”. VaraaAi nie gwarantuje nieprzerwanego ani bezbłędnego działania Usługi VaraaAi i nie ponosi odpowiedzialności za bezpośrednie ani pośrednie szkody wynikające z korzystania z Usługi VaraaAi lub usług Partnera.",
        ],
      },
      {
        title: "8. Własność intelektualna",
        paragraphs: [
          "Wszelkie prawa własności i prawa własności intelektualnej do Usługi VaraaAi należą do Moja Investors Oy lub jej licencjodawców.",
        ],
      },
      {
        title: "9. Obowiązywanie i zmiany Warunków",
        paragraphs: [
          "Możesz w każdej chwili zaprzestać korzystania z Usługi VaraaAi, żądając usunięcia konta. VaraaAi może zawiesić lub zakończyć Twój dostęp z uzasadnionej przyczyny.",
          "VaraaAi może w dowolnym momencie zmienić niniejsze Warunki. Dalsze korzystanie z Usługi VaraaAi po zmianie Warunków oznacza akceptację zmian. Jeśli się nie zgadzasz, musisz zaprzestać korzystania z Usługi VaraaAi.",
        ],
      },
      {
        title: "10. Przeniesienie praw",
        paragraphs: [
          "Moja Investors Oy może przenieść Usługę VaraaAi wraz z prawami i obowiązkami wynikającymi z niniejszych Warunków na dowolną stronę trzecią bez Twojej uprzedniej zgody.",
        ],
      },
      {
        title: "11. Prawo właściwe i rozstrzyganie sporów",
        paragraphs: [
          "Niniejsze Warunki podlegają prawu fińskiemu. Wszelkie spory będą najpierw rozwiązywane w drodze negocjacji w dobrej wierze. Jeśli nie dojdzie do porozumienia, spór może zostać skierowany do Sądu Rejonowego w Helsinkach (Helsingin käräjäoikeus) jako sądu pierwszej instancji.",
          "W przypadku konsumentów obowiązkowe prawa ochrony konsumentów obowiązujące w kraju Twojego zamieszkania nadal mają zastosowanie i nie są ograniczone niniejszymi Warunkami.",
        ],
      },
      { title: "12. Kontakt", paragraphs: [] },
    ],
  },
  de: {
    title: "Nutzungsbedingungen",
    updated: "Zuletzt aktualisiert: 25. September 2026",
    businessIdLabel: "Unternehmens-ID",
    addressLabel: "Adresse",
    sections: [
      {
        title: "1. Allgemeines",
        paragraphs: [
          "Bitte lies diese Nutzungsbedingungen (die „Bedingungen“) sorgfältig. Indem du ein Konto erstellst, einen Termin buchst oder eine Funktion der Website VaraaAi.Com (der „VaraaAi-Dienst“) nutzt, bestätigst du, dass du diese Bedingungen gelesen und verstanden hast und ihnen zustimmst.",
          "Der VaraaAi-Dienst wird von **Moja Investors Oy** („VaraaAi“, „wir“) entwickelt und betrieben, Unternehmens-ID **3555331-8**, mit Sitz in **Hakaniemen torikatu 2 L 48, 00530 Helsinki, Finnland**, Kontakt-E-Mail **info@varaaAi.com**.",
          "Wenn du unter 18 Jahre alt bist, benötigst du vor der Annahme dieser Bedingungen die Einwilligung deines gesetzlichen Vertreters. Wenn du den Bedingungen nicht zustimmst oder nicht befugt bist, für die von dir vertretene Organisation zu handeln, darfst du den VaraaAi-Dienst nicht nutzen.",
        ],
      },
      {
        title: "2. So funktioniert der Dienst",
        paragraphs: [
          "VaraaAi betreibt eine Online-Plattform, die Kunden („du“) mit unabhängigen Salons, Nagelstudios, Spas und anderen Beauty-Dienstleistern („Partner“) für die Buchung von Terminen zusammenbringt. VaraaAi bietet oder verkauft selbst keine Beauty-Dienstleistungen an — jeder Partner stellt seine Dienstleistungen, Preise und Zeitpläne auf der Plattform selbstständig ein, verwaltet sie und ist dafür verantwortlich.",
          "Diese Bedingungen binden nur dich und VaraaAi. Eine Buchung über VaraaAi bedeutet außerdem, dass du den individuellen Buchungsbedingungen und der Stornierungsrichtlinie des Partners zustimmst, bei dem du gebucht hast und die dir zum Zeitpunkt der Buchung angezeigt werden.",
          "In einigen Fällen ermöglicht VaraaAi dir, einen Partner direkt auf der Plattform über einen von VaraaAi ausgewählten Zahlungsdienstleister im Voraus zu bezahlen. In diesem Fall leitet VaraaAi (oder sein Zahlungsdienstleister) die Zahlung lediglich an den Partner weiter und ist nicht der Verkäufer der Dienstleistung.",
          "VaraaAi kann jederzeit jede Funktion des VaraaAi-Dienstes ändern, ergänzen oder einstellen.",
        ],
      },
      {
        title: "3. Deine Rechte und Pflichten",
        paragraphs: [
          "Du verpflichtest dich, den VaraaAi-Dienst nur für seinen vorgesehenen Zweck zu nutzen: Beauty-Termine zu finden und zu buchen oder — falls du Salonbesitzer bist — die Dienstleistungen und Buchungen deines Salons zu verwalten. Die Nutzung des VaraaAi-Dienstes für rechtswidrige, betrügerische oder wettbewerbswidrige Zwecke ist streng untersagt.",
          "Du verpflichtest dich, bei der Kontoerstellung und Terminbuchung zutreffende und wahrheitsgemäße Angaben zu machen und über den VaraaAi-Dienst keine rechtswidrigen oder anstößigen Inhalte hochzuladen oder zu teilen.",
          "VaraaAi kann deinen Zugang zum VaraaAi-Dienst sperren oder beenden, wenn VaraaAi begründeten Anlass zu der Annahme hat, dass du gegen diese Bedingungen oder geltendes Recht verstoßen hast, oder wenn eine zuständige Behörde dies verlangt.",
        ],
      },
      {
        title: "4. Buchung, Umbuchung und Stornierung",
        paragraphs: [
          "Wenn du über VaraaAi einen Termin buchst, stimmst du auch der Stornierungsrichtlinie des jeweiligen Partners zu, die dir vor der Bestätigung der Buchung angezeigt wird. Stornierungsrichtlinien können sich zwischen Salons unterscheiden.",
          "Du kannst deine Termine unter „Meine Buchungen“ in deinem VaraaAi-Konto stornieren oder verfolgen, innerhalb des Zeitfensters, das die Stornierungsrichtlinie des Partners erlaubt. Außerhalb dieses Zeitfensters wende dich bitte direkt an den Salon.",
          "Ein Partner kann deinen Termin bei Bedarf auf einen anderen Zeitpunkt verschieben; in diesem Fall erhältst du eine automatische E-Mail-Benachrichtigung mit der neuen Zeit.",
        ],
      },
      {
        title: "5. Zahlung",
        paragraphs: [
          "Je nach Salon kannst du direkt im Salon (bar oder mit Karte), per Banküberweisung mit den vom Salon angegebenen Daten oder — sofern der Salon dies aktiviert hat — online direkt über VaraaAi mit einem Zahlungsdienstleister bezahlen.",
          "VaraaAi behält bei der Buchung keine Gebühr von Kunden ein; jeder online gezahlte Betrag wird über den Zahlungsdienstleister an den Partner weitergeleitet.",
        ],
      },
      {
        title: "6. Datenschutz",
        paragraphs: [
          "Bei der Nutzung des VaraaAi-Dienstes stellst du VaraaAi bestimmte personenbezogene Daten auf Grundlage deiner Einwilligung zur Verfügung. Informationen zu deinem Termin (Name, Telefonnummer, E-Mail, Notizen) werden mit dem Partner geteilt, bei dem du gebucht hast, damit er dich bedienen kann.",
          "VaraaAi verwendet die bei der Nutzung des Dienstes anfallenden Daten, um den Dienst zu betreiben, Fehler zu beheben und zu verbessern und — sofern du eingewilligt hast — für Marketingzwecke. Du kannst jederzeit die Löschung deines Kontos und deiner personenbezogenen Daten verlangen, indem du **info@varaaAi.com** kontaktierst.",
        ],
      },
      {
        title: "7. Haftung",
        paragraphs: [
          "VaraaAi ist nicht verantwortlich für Inhalt, Qualität, Sicherheit oder andere Aspekte der von einem Partner erbrachten Dienstleistungen. Beschwerden zu einer gebuchten Dienstleistung (etwa zu Qualität, Stornierung oder Umbuchung) müssen direkt an den Partner gerichtet werden.",
          "Der VaraaAi-Dienst wird „wie besehen“ bereitgestellt. VaraaAi garantiert keinen unterbrechungsfreien oder fehlerfreien Betrieb des VaraaAi-Dienstes und haftet nicht für direkte oder indirekte Schäden, die aus der Nutzung des VaraaAi-Dienstes oder der Dienstleistungen eines Partners entstehen.",
        ],
      },
      {
        title: "8. Geistiges Eigentum",
        paragraphs: [
          "Alle Eigentums- und Immaterialgüterrechte am VaraaAi-Dienst liegen bei Moja Investors Oy oder deren Lizenzgebern.",
        ],
      },
      {
        title: "9. Laufzeit und Änderungen dieser Bedingungen",
        paragraphs: [
          "Du kannst die Nutzung des VaraaAi-Dienstes jederzeit beenden, indem du die Löschung deines Kontos beantragst. VaraaAi kann deinen Zugang aus wichtigem Grund sperren oder beenden.",
          "VaraaAi kann diese Bedingungen jederzeit ändern. Wenn du den VaraaAi-Dienst nach einer Änderung weiter nutzt, akzeptierst du die Änderungen. Wenn du nicht einverstanden bist, musst du die Nutzung des VaraaAi-Dienstes einstellen.",
        ],
      },
      {
        title: "10. Abtretung",
        paragraphs: [
          "Moja Investors Oy kann den VaraaAi-Dienst samt den Rechten und Pflichten aus diesen Bedingungen ohne deine vorherige Zustimmung an Dritte übertragen.",
        ],
      },
      {
        title: "11. Anwendbares Recht und Streitbeilegung",
        paragraphs: [
          "Diese Bedingungen unterliegen finnischem Recht. Streitigkeiten werden zunächst durch Verhandlungen in gutem Glauben geklärt. Kommt keine Einigung zustande, kann die Streitigkeit vor dem Bezirksgericht Helsinki (Helsingin käräjäoikeus) als erster Instanz verhandelt werden.",
          "Für Verbraucher gelten weiterhin die zwingenden Verbraucherschutzrechte deines Wohnsitzlandes; sie werden durch diese Bedingungen nicht eingeschränkt.",
        ],
      },
      { title: "12. Kontakt", paragraphs: [] },
    ],
  },
  km: {
    title: "លក្ខខណ្ឌប្រើប្រាស់",
    updated: "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ ២៥ កញ្ញា ២០២៦",
    businessIdLabel: "លេខសម្គាល់អាជីវកម្ម",
    addressLabel: "អាសយដ្ឋាន",
    sections: [
      {
        title: "១. ទូទៅ",
        paragraphs: [
          "សូមអានលក្ខខណ្ឌប្រើប្រាស់នេះ (“លក្ខខណ្ឌ”) ឱ្យបានហ្មត់ចត់។ ដោយការបង្កើតគណនី កក់ការណាត់ជួប ឬប្រើប្រាស់លក្ខណៈពិសេសណាមួយនៃគេហទំព័រ VaraaAi.Com (“សេវា VaraaAi”) អ្នកបញ្ជាក់ថាអ្នកបានអាន យល់ និងយល់ព្រមចុះកិច្ចសន្យាតាមលក្ខខណ្ឌទាំងនេះ។",
          "សេវា VaraaAi ត្រូវបានអភិវឌ្ឍ និងជាកម្មសិទ្ធិរបស់ **Moja Investors Oy** (“VaraaAi”, “យើង”) លេខសម្គាល់អាជីវកម្ម **3555331-8** មានអាសយដ្ឋានចុះបញ្ជីនៅ **Hakaniemen torikatu 2 L 48, 00530 Helsinki, Finland** អ៊ីមែលទំនាក់ទំនង **info@varaaAi.com**។",
          "ប្រសិនបើអ្នកមានអាយុក្រោម ១៨ ឆ្នាំ អ្នកត្រូវមានការយល់ព្រមពីអាណាព្យាបាលស្របច្បាប់មុនពេលទទួលយកលក្ខខណ្ឌទាំងនេះ។ ប្រសិនបើអ្នកមិនយល់ព្រមនឹងលក្ខខណ្ឌ ឬមិនមានសិទ្ធិធ្វើសកម្មភាពតាមនាមអង្គការដែលអ្នកតំណាង អ្នកមិនត្រូវបានអនុញ្ញាតឱ្យប្រើសេវា VaraaAi ទេ។",
        ],
      },
      {
        title: "២. របៀបដែលសេវាដំណើរការ",
        paragraphs: [
          "VaraaAi ដំណើរការវេទិកាអនឡាញមួយដែលភ្ជាប់អតិថិជន (“អ្នក”) ជាមួយសាឡុងកាត់សក់ ហាងធ្វើក្រចក ស្ប៉ា និងអ្នកផ្តល់សេវាសម្ផស្សឯករាជ្យផ្សេងទៀត (“ដៃគូ”) ដើម្បីកក់ការណាត់ជួប។ VaraaAi មិនផ្តល់ ឬលក់សេវាសម្ផស្សដោយខ្លួនឯងទេ — ដៃគូនីមួយៗចុះបញ្ជី គ្រប់គ្រង និងទទួលខុសត្រូវចំពោះសេវា តម្លៃ និងកាលវិភាគរបស់ខ្លួនដោយឯករាជ្យនៅលើវេទិកា។",
          "លក្ខខណ្ឌទាំងនេះចងភ្ជាប់តែអ្នក និង VaraaAi ប៉ុណ្ណោះ។ ការកក់តាម VaraaAi មានន័យថាអ្នកក៏យល់ព្រមនឹងលក្ខខណ្ឌកក់ និងគោលការណ៍លុបចោលរបស់ដៃគូដែលអ្នកកក់ ដែលបានបង្ហាញដល់អ្នកនៅពេលកក់។",
          "ក្នុងករណីមួយចំនួន VaraaAi អនុញ្ញាតឱ្យអ្នកបង់ប្រាក់ជូនដៃគូជាមុនដោយផ្ទាល់នៅលើវេទិកា តាមរយៈអ្នកដំណើរការទូទាត់ដែល VaraaAi ជ្រើសរើស។ ក្នុងករណីនេះ VaraaAi (ឬអ្នកដំណើរការទូទាត់) គ្រាន់តែបញ្ជូនការទូទាត់ទៅដៃគូ ហើយមិនមែនជាអ្នកលក់សេវាទេ។",
          "VaraaAi អាចផ្លាស់ប្តូរ បន្ថែម ឬបញ្ឈប់លក្ខណៈពិសេសណាមួយនៃសេវា VaraaAi បានគ្រប់ពេល។",
        ],
      },
      {
        title: "៣. សិទ្ធិ និងកាតព្វកិច្ចរបស់អ្នក",
        paragraphs: [
          "អ្នកយល់ព្រមប្រើសេវា VaraaAi តែសម្រាប់គោលបំណងដែលវាត្រូវបានរចនា៖ ស្វែងរក និងកក់ការណាត់ជួបសម្ផស្ស ឬ — ប្រសិនបើអ្នកជាម្ចាស់សាឡុង — គ្រប់គ្រងសេវា និងការកក់របស់សាឡុងអ្នក។ ហាមឃាត់យ៉ាងតឹងរ៉ឹងមិនឱ្យប្រើសេវា VaraaAi សម្រាប់គោលបំណងខុសច្បាប់ ក្លែងបន្លំ ឬប្រកួតប្រជែងមិនស្មើភាព។",
          "អ្នកយល់ព្រមផ្តល់ព័ត៌មានត្រឹមត្រូវ និងស្មោះត្រង់នៅពេលចុះឈ្មោះគណនី និងកក់ការណាត់ជួប ហើយមិនផ្ទុកឡើង ឬចែករំលែកខ្លឹមសារខុសច្បាប់ ឬប្រមាថតាមរយៈសេវា VaraaAi ទេ។",
          "VaraaAi អាចផ្អាក ឬបញ្ចប់សិទ្ធិចូលប្រើសេវា VaraaAi របស់អ្នក ប្រសិនបើ VaraaAi មានមូលដ្ឋានសមហេតុផលដើម្បីជឿថាអ្នកបានបំពានលក្ខខណ្ឌទាំងនេះ ឬច្បាប់ជាធរមាន ឬនៅពេលអាជ្ញាធរមានសមត្ថកិច្ចទាមទារ។",
        ],
      },
      {
        title: "៤. ការកក់ ការប្តូរពេល និងការលុបចោល",
        paragraphs: [
          "នៅពេលអ្នកកក់ការណាត់ជួបតាម VaraaAi អ្នកក៏យល់ព្រមនឹងគោលការណ៍លុបចោលរបស់ដៃគូនោះ ដែលបង្ហាញមុនអ្នកបញ្ជាក់ការកក់។ គោលការណ៍លុបចោលអាចខុសគ្នាតាមសាឡុងនីមួយៗ។",
          "អ្នកអាចលុបចោល ឬតាមដានការណាត់ជួបរបស់អ្នកនៅក្នុង “ការកក់របស់ខ្ញុំ” លើគណនី VaraaAi ក្នុងរយៈពេលដែលគោលការណ៍លុបចោលរបស់ដៃគូអនុញ្ញាត។ ក្រៅពីនេះ សូមទាក់ទងសាឡុងដោយផ្ទាល់។",
          "ដៃគូអាចប្តូរពេលការណាត់ជួបរបស់អ្នកទៅពេលផ្សេងនៅពេលចាំបាច់។ ក្នុងករណីនេះអ្នកនឹងទទួលបានអ៊ីមែលជូនដំណឹងស្វ័យប្រវត្តិជាមួយពេលថ្មី។",
        ],
      },
      {
        title: "៥. ការទូទាត់",
        paragraphs: [
          "អាស្រ័យលើសាឡុងនីមួយៗ អ្នកអាចបង់ដោយផ្ទាល់នៅសាឡុង (សាច់ប្រាក់ ឬកាត) ផ្ទេរប្រាក់តាមធនាគារតាមព័ត៌មានដែលសាឡុងផ្តល់ ឬ — ប្រសិនបើសាឡុងបើកមុខងារនេះ — បង់ប្រាក់អនឡាញដោយផ្ទាល់នៅលើ VaraaAi តាមរយៈអ្នកដំណើរការទូទាត់។",
          "VaraaAi មិនកាត់ថ្លៃសេវាណាមួយពីអតិថិជនពេលកក់ទេ។ ចំនួនទឹកប្រាក់ដែលបានបង់អនឡាញត្រូវបានបញ្ជូនទៅដៃគូតាមរយៈអ្នកដំណើរការទូទាត់។",
        ],
      },
      {
        title: "៦. ភាពឯកជន",
        paragraphs: [
          "នៅពេលប្រើសេវា VaraaAi អ្នកផ្តល់ទិន្នន័យផ្ទាល់ខ្លួនមួយចំនួនដល់ VaraaAi ដោយផ្អែកលើការយល់ព្រមរបស់អ្នក។ ព័ត៌មានទាក់ទងនឹងការណាត់ជួបរបស់អ្នក (ឈ្មោះ លេខទូរស័ព្ទ អ៊ីមែល កំណត់ចំណាំ) ត្រូវបានចែករំលែកជាមួយដៃគូដែលអ្នកកក់ ដើម្បីឱ្យពួកគេអាចបម្រើអ្នកបាន។",
          "VaraaAi ប្រើទិន្នន័យដែលកើតចេញពីការប្រើប្រាស់សេវា ដើម្បីដំណើរការ ដោះស្រាយបញ្ហា និងកែលម្អសេវា ហើយ — ប្រសិនបើអ្នកបានយល់ព្រម — សម្រាប់គោលបំណងទីផ្សារ។ អ្នកអាចស្នើសុំលុបគណនី និងទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកបានគ្រប់ពេល ដោយទាក់ទង **info@varaaAi.com**។",
        ],
      },
      {
        title: "៧. ការទទួលខុសត្រូវ",
        paragraphs: [
          "VaraaAi មិនទទួលខុសត្រូវចំពោះខ្លឹមសារ គុណភាព សុវត្ថិភាព ឬទិដ្ឋភាពផ្សេងទៀតនៃសេវាដែលដៃគូផ្តល់ទេ។ ពាក្យបណ្តឹងទាក់ទងនឹងសេវាដែលបានកក់ (ដូចជាគុណភាពសេវា ការលុបចោល ឬការប្តូរពេល) ត្រូវផ្ញើដោយផ្ទាល់ទៅដៃគូ។",
          "សេវា VaraaAi ត្រូវបានផ្តល់ជូនតាម “ស្ថានភាពដែលមាន”។ VaraaAi មិនធានាថាសេវា VaraaAi ដំណើរការជាបន្តបន្ទាប់ ឬគ្មានកំហុសទេ ហើយមិនទទួលខុសត្រូវចំពោះការខូចខាតដោយផ្ទាល់ ឬដោយប្រយោលដែលកើតចេញពីការប្រើសេវា VaraaAi ឬសេវារបស់ដៃគូទេ។",
        ],
      },
      {
        title: "៨. កម្មសិទ្ធិបញ្ញា",
        paragraphs: [
          "សិទ្ធិកម្មសិទ្ធិ និងកម្មសិទ្ធិបញ្ញាទាំងអស់លើសេវា VaraaAi ជារបស់ Moja Investors Oy ឬដៃគូផ្តល់អាជ្ញាប័ណ្ណរបស់ Moja Investors Oy។",
        ],
      },
      {
        title: "៩. សុពលភាព និងការផ្លាស់ប្តូរលក្ខខណ្ឌ",
        paragraphs: [
          "អ្នកអាចឈប់ប្រើសេវា VaraaAi បានគ្រប់ពេល ដោយស្នើសុំលុបគណនី។ VaraaAi អាចផ្អាក ឬបញ្ចប់សិទ្ធិចូលប្រើរបស់អ្នក ប្រសិនបើមានមូលហេតុត្រឹមត្រូវ។",
          "VaraaAi អាចកែប្រែលក្ខខណ្ឌនេះបានគ្រប់ពេល។ ការបន្តប្រើសេវា VaraaAi បន្ទាប់ពីលក្ខខណ្ឌត្រូវបានកែប្រែ មានន័យថាអ្នកទទួលយកការផ្លាស់ប្តូរនោះ។ ប្រសិនបើអ្នកមិនយល់ព្រម អ្នកត្រូវឈប់ប្រើសេវា VaraaAi។",
        ],
      },
      {
        title: "១០. ការផ្ទេរសិទ្ធិ",
        paragraphs: [
          "Moja Investors Oy អាចផ្ទេរសេវា VaraaAi រួមទាំងសិទ្ធិ និងកាតព្វកិច្ចតាមលក្ខខណ្ឌនេះ ទៅភាគីទីបីណាមួយ ដោយមិនចាំបាច់មានការយល់ព្រមជាមុនពីអ្នក។",
        ],
      },
      {
        title: "១១. ច្បាប់ជាធរមាន និងការដោះស្រាយវិវាទ",
        paragraphs: [
          "លក្ខខណ្ឌនេះស្ថិតនៅក្រោមច្បាប់នៃប្រទេសហ្វាំងឡង់។ វិវាទណាមួយនឹងត្រូវដោះស្រាយជាមុនតាមរយៈការចរចាដោយសុច្ចរិត។ ប្រសិនបើមិនអាចឯកភាពគ្នា វិវាទអាចត្រូវបានយកទៅដោះស្រាយនៅតុលាការស្រុកហែលស៊ីនគី (Helsingin käräjäoikeus) ជាតុលាការជាន់ដំបូង។",
          "សម្រាប់អតិថិជនជាអ្នកប្រើប្រាស់ សិទ្ធិដែលច្បាប់កំណត់ក្នុងការការពារអ្នកប្រើប្រាស់នៅប្រទេសដែលអ្នករស់នៅនៅតែអនុវត្ត ហើយមិនត្រូវបានកម្រិតដោយលក្ខខណ្ឌនេះទេ។",
        ],
      },
      { title: "១២. ទំនាក់ទំនង", paragraphs: [] },
    ],
  },
  th: {
    title: "ข้อกำหนดการใช้งาน",
    updated: "อัปเดตล่าสุด: 25 กันยายน 2026",
    businessIdLabel: "หมายเลขทะเบียนนิติบุคคล",
    addressLabel: "ที่อยู่",
    sections: [
      {
        title: "1. ข้อมูลทั่วไป",
        paragraphs: [
          "กรุณาอ่านข้อกำหนดการใช้งานนี้ (“ข้อกำหนด”) อย่างละเอียด การสร้างบัญชี จองนัดหมาย หรือใช้ฟีเจอร์ใดๆ ของเว็บไซต์ VaraaAi.Com (“บริการ VaraaAi”) ถือว่าคุณยืนยันว่าได้อ่าน เข้าใจ และตกลงผูกพันตามข้อกำหนดนี้",
          "บริการ VaraaAi พัฒนาและเป็นเจ้าของโดย **Moja Investors Oy** (“VaraaAi”, “เรา”) หมายเลขทะเบียนนิติบุคคล **3555331-8** สำนักงานจดทะเบียนที่ **Hakaniemen torikatu 2 L 48, 00530 Helsinki, Finland** อีเมลติดต่อ **info@varaaAi.com**",
          "หากคุณอายุต่ำกว่า 18 ปี คุณต้องได้รับความยินยอมจากผู้ปกครองตามกฎหมายก่อนยอมรับข้อกำหนดนี้ หากคุณไม่เห็นด้วยกับข้อกำหนด หรือไม่ได้รับอนุญาตให้กระทำการแทนองค์กรที่คุณเป็นตัวแทน คุณไม่สามารถใช้บริการ VaraaAi ได้",
        ],
      },
      {
        title: "2. บริการทำงานอย่างไร",
        paragraphs: [
          "VaraaAi ให้บริการแพลตฟอร์มออนไลน์ที่เชื่อมต่อลูกค้า (“คุณ”) กับร้านเสริมสวย ร้านทำเล็บ สปา และผู้ให้บริการความงามอิสระอื่นๆ (“พาร์ทเนอร์”) เพื่อจองนัดหมาย VaraaAi ไม่ได้ให้หรือขายบริการความงามเอง — พาร์ทเนอร์แต่ละรายลงรายการ จัดการ และรับผิดชอบบริการ ราคา และตารางเวลาของตนเองบนแพลตฟอร์มอย่างอิสระ",
          "ข้อกำหนดนี้ผูกพันเฉพาะคุณและ VaraaAi เท่านั้น การจองผ่าน VaraaAi หมายความว่าคุณยอมรับเงื่อนไขการจองและนโยบายการยกเลิกของพาร์ทเนอร์ที่คุณจอง ซึ่งแสดงให้คุณเห็น ณ เวลาที่จอง",
          "ในบางกรณี VaraaAi อนุญาตให้คุณชำระเงินให้พาร์ทเนอร์ล่วงหน้าบนแพลตฟอร์มโดยตรง ผ่านผู้ให้บริการชำระเงินที่ VaraaAi เลือก ในกรณีนี้ VaraaAi (หรือผู้ให้บริการชำระเงิน) เพียงส่งต่อเงินไปยังพาร์ทเนอร์ และไม่ใช่ผู้ขายบริการ",
          "VaraaAi อาจเปลี่ยนแปลง เพิ่มเติม หรือยกเลิกฟีเจอร์ใดๆ ของบริการ VaraaAi ได้ทุกเมื่อ",
        ],
      },
      {
        title: "3. สิทธิและหน้าที่ของคุณ",
        paragraphs: [
          "คุณตกลงใช้บริการ VaraaAi เฉพาะตามวัตถุประสงค์ที่ออกแบบไว้ คือ ค้นหาและจองนัดหมายความงาม หรือ — หากคุณเป็นเจ้าของร้าน — จัดการบริการและการจองของร้านคุณ ห้ามใช้บริการ VaraaAi เพื่อวัตถุประสงค์ที่ผิดกฎหมาย หลอกลวง หรือแข่งขันอย่างไม่เป็นธรรมโดยเด็ดขาด",
          "คุณตกลงให้ข้อมูลที่ถูกต้องและเป็นความจริงเมื่อลงทะเบียนบัญชีและจองนัดหมาย และไม่อัปโหลดหรือแชร์เนื้อหาที่ผิดกฎหมายหรือไม่เหมาะสมผ่านบริการ VaraaAi",
          "VaraaAi อาจระงับหรือยุติการเข้าถึงบริการ VaraaAi ของคุณ หาก VaraaAi มีเหตุอันควรเชื่อว่าคุณฝ่าฝืนข้อกำหนดนี้หรือกฎหมายที่ใช้บังคับ หรือเมื่อหน่วยงานที่มีอำนาจร้องขอ",
        ],
      },
      {
        title: "4. การจอง การเลื่อนนัด และการยกเลิก",
        paragraphs: [
          "เมื่อคุณจองนัดหมายผ่าน VaraaAi คุณยอมรับนโยบายการยกเลิกของพาร์ทเนอร์รายนั้นด้วย ซึ่งจะแสดงก่อนที่คุณยืนยันการจอง นโยบายการยกเลิกอาจแตกต่างกันในแต่ละร้าน",
          "คุณสามารถยกเลิกหรือติดตามนัดหมายของคุณได้ที่ “การจองของฉัน” ในบัญชี VaraaAi ภายในกรอบเวลาที่นโยบายการยกเลิกของพาร์ทเนอร์อนุญาต นอกเหนือจากนั้น กรุณาติดต่อร้านโดยตรง",
          "พาร์ทเนอร์อาจเลื่อนนัดหมายของคุณไปเวลาอื่นเมื่อจำเป็น ในกรณีนี้คุณจะได้รับอีเมลแจ้งเตือนอัตโนมัติพร้อมเวลาใหม่",
        ],
      },
      {
        title: "5. การชำระเงิน",
        paragraphs: [
          "ขึ้นอยู่กับแต่ละร้าน คุณอาจชำระเงินที่ร้านโดยตรง (เงินสดหรือบัตร) โอนเงินผ่านธนาคารตามข้อมูลที่ร้านให้ หรือ — หากร้านเปิดใช้ฟีเจอร์นี้ — ชำระเงินออนไลน์บน VaraaAi ผ่านผู้ให้บริการชำระเงิน",
          "VaraaAi ไม่หักค่าธรรมเนียมใดๆ จากลูกค้าเมื่อจอง จำนวนเงินที่ชำระออนไลน์จะถูกส่งต่อให้พาร์ทเนอร์ผ่านผู้ให้บริการชำระเงิน",
        ],
      },
      {
        title: "6. ความเป็นส่วนตัว",
        paragraphs: [
          "เมื่อใช้บริการ VaraaAi คุณให้ข้อมูลส่วนบุคคลบางอย่างแก่ VaraaAi บนพื้นฐานของความยินยอมของคุณ ข้อมูลที่เกี่ยวข้องกับนัดหมายของคุณ (ชื่อ เบอร์โทรศัพท์ อีเมล บันทึก) จะถูกแบ่งปันกับพาร์ทเนอร์ที่คุณจอง เพื่อให้พวกเขาให้บริการคุณได้",
          "VaraaAi ใช้ข้อมูลที่เกิดจากการใช้บริการเพื่อดำเนินงาน แก้ไขปัญหา และปรับปรุงบริการ และ — หากคุณยินยอม — เพื่อการตลาด คุณสามารถขอลบบัญชีและข้อมูลส่วนบุคคลของคุณได้ทุกเมื่อโดยติดต่อ **info@varaaAi.com**",
        ],
      },
      {
        title: "7. ความรับผิดและการจำกัดความรับผิด",
        paragraphs: [
          "VaraaAi ไม่รับผิดชอบต่อเนื้อหา คุณภาพ ความปลอดภัย หรือด้านอื่นใดของบริการที่พาร์ทเนอร์ให้ ข้อร้องเรียนเกี่ยวกับบริการที่จอง (เช่น คุณภาพบริการ การยกเลิก หรือการเลื่อนนัด) ต้องส่งตรงถึงพาร์ทเนอร์",
          "บริการ VaraaAi ให้บริการตาม “สภาพที่เป็นอยู่” VaraaAi ไม่รับประกันว่าบริการ VaraaAi จะทำงานต่อเนื่องหรือปราศจากข้อผิดพลาด และไม่รับผิดต่อความเสียหายทางตรงหรือทางอ้อมที่เกิดจากการใช้บริการ VaraaAi หรือบริการของพาร์ทเนอร์",
        ],
      },
      {
        title: "8. ทรัพย์สินทางปัญญา",
        paragraphs: [
          "สิทธิความเป็นเจ้าของและทรัพย์สินทางปัญญาทั้งหมดในบริการ VaraaAi เป็นของ Moja Investors Oy หรือผู้ให้อนุญาตสิทธิ์ของ Moja Investors Oy",
        ],
      },
      {
        title: "9. การมีผลบังคับและการเปลี่ยนแปลงข้อกำหนด",
        paragraphs: [
          "คุณสามารถหยุดใช้บริการ VaraaAi ได้ทุกเมื่อโดยขอลบบัญชี VaraaAi อาจระงับหรือยุติการเข้าถึงของคุณหากมีเหตุผลอันสมควร",
          "VaraaAi อาจแก้ไขข้อกำหนดนี้ได้ทุกเมื่อ การที่คุณใช้บริการ VaraaAi ต่อหลังจากแก้ไขข้อกำหนด ถือว่าคุณยอมรับการเปลี่ยนแปลงนั้น หากไม่เห็นด้วย คุณต้องหยุดใช้บริการ VaraaAi",
        ],
      },
      {
        title: "10. การโอนสิทธิ",
        paragraphs: [
          "Moja Investors Oy อาจโอนบริการ VaraaAi รวมถึงสิทธิและหน้าที่ตามข้อกำหนดนี้ให้บุคคลที่สามได้โดยไม่ต้องได้รับความยินยอมจากคุณล่วงหน้า",
        ],
      },
      {
        title: "11. กฎหมายที่ใช้บังคับและการระงับข้อพิพาท",
        paragraphs: [
          "ข้อกำหนดนี้อยู่ภายใต้กฎหมายของประเทศฟินแลนด์ ข้อพิพาทใดๆ จะได้รับการแก้ไขด้วยการเจรจาโดยสุจริตก่อน หากไม่สามารถตกลงกันได้ ข้อพิพาทอาจนำสู่ศาลแขวงเฮลซิงกิ (Helsingin käräjäoikeus) ในฐานะศาลชั้นต้น",
          "สำหรับลูกค้าที่เป็นผู้บริโภค สิทธิคุ้มครองผู้บริโภคตามกฎหมายบังคับของประเทศที่คุณพำนักยังคงมีผลใช้บังคับ และไม่ถูกจำกัดโดยข้อกำหนดนี้",
        ],
      },
      { title: "12. ติดต่อ", paragraphs: [] },
    ],
  },
};

export const TERMS_ENTITY = {
  name: "Moja Investors Oy",
  businessId: "3555331-8",
  address: ENTITY_ADDRESS,
  email: "info@varaaAi.com",
};
