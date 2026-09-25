export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const vi = locale === "vi";

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-2 text-3xl font-bold text-ink-900">
        {vi ? "Điều khoản sử dụng" : "Terms of Use"}
      </h1>
      <p className="mb-10 text-sm text-ink-400">
        {vi ? "Cập nhật lần cuối: 25/09/2026" : "Last updated: 25 September 2026"}
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-ink-700 sm:text-base">
        <Section title={vi ? "1. Giới thiệu chung" : "1. General"}>
          {vi ? (
            <>
              <p>
                Vui lòng đọc kỹ Điều khoản sử dụng này (“Điều khoản”). Bằng việc đăng ký tài
                khoản, đặt lịch hẹn, hoặc sử dụng bất kỳ tính năng nào của website VaraaAi.Com
                (“Dịch vụ VaraaAi”), bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các
                Điều khoản này.
              </p>
              <p>
                Đơn vị phát triển và sở hữu Dịch vụ VaraaAi là <strong>Moja Investors Oy</strong>{" "}
                (“VaraaAi”, “chúng tôi”), mã số doanh nghiệp{" "}
                <strong>3555331-8</strong>, có địa chỉ tại{" "}
                <strong>Hakaniemen torikatu 2 L 48, 00530 Helsinki</strong>, email liên hệ{" "}
                <strong>info@varaaAi.com</strong>.
              </p>
              <p>
                Nếu bạn chưa đủ 18 tuổi, bạn cần có sự đồng ý của người giám hộ hợp pháp trước
                khi chấp nhận các Điều khoản này. Nếu bạn không đồng ý với Điều khoản, hoặc
                không có quyền đại diện cho tổ chức mà bạn đang thay mặt, bạn không được phép
                sử dụng Dịch vụ VaraaAi.
              </p>
            </>
          ) : (
            <>
              <p>
                Please read these Terms of Use (the “Terms”) carefully. By creating an account,
                booking an appointment, or using any feature of the VaraaAi.Com website (the
                “VaraaAi Service”), you confirm that you have read, understood and agree to be
                bound by these Terms.
              </p>
              <p>
                The VaraaAi Service is developed and owned by <strong>Moja Investors Oy</strong>{" "}
                (“VaraaAi”, “we”), business ID <strong>3555331-8</strong>, registered at{" "}
                <strong>Hakaniemen torikatu 2 L 48, 00530 Helsinki, Finland</strong>, contact
                email <strong>info@varaaAi.com</strong>.
              </p>
              <p>
                If you are under 18, you must have your legal guardian’s consent before
                accepting these Terms. If you do not agree to the Terms, or you are not
                authorized to act on behalf of the organization you represent, you may not use
                the VaraaAi Service.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "2. Cách thức hoạt động của dịch vụ" : "2. How the service works"}>
          {vi ? (
            <>
              <p>
                VaraaAi vận hành một nền tảng trực tuyến kết nối khách hàng (“Bạn”) với các
                salon, tiệm nail, spa và các đơn vị cung cấp dịch vụ làm đẹp độc lập (“Đối
                tác”) để đặt lịch hẹn. VaraaAi không tự mình cung cấp hay bán các dịch vụ làm
                đẹp — Đối tác là bên độc lập tự đăng, quản lý và chịu trách nhiệm về dịch vụ,
                giá cả và lịch làm việc của mình trên nền tảng.
              </p>
              <p>
                Điều khoản này chỉ ràng buộc giữa Bạn và VaraaAi. Việc đặt lịch qua VaraaAi
                đồng nghĩa với việc Bạn cũng đồng ý với các điều kiện đặt lịch, chính sách hủy
                riêng của Đối tác mà Bạn đặt lịch, được hiển thị tại thời điểm đặt lịch.
              </p>
              <p>
                Trong một số trường hợp, VaraaAi cho phép Bạn thanh toán trước cho Đối tác ngay
                trên nền tảng thông qua đơn vị trung gian thanh toán do VaraaAi lựa chọn. Trong
                trường hợp này, VaraaAi (hoặc đơn vị trung gian thanh toán) chỉ đóng vai trò
                chuyển khoản thanh toán đến Đối tác, không phải là bên bán dịch vụ.
              </p>
              <p>
                VaraaAi có quyền thay đổi, bổ sung hoặc ngừng cung cấp bất kỳ tính năng nào của
                Dịch vụ VaraaAi vào bất kỳ thời điểm nào.
              </p>
            </>
          ) : (
            <>
              <p>
                VaraaAi operates an online platform that connects customers (“you”) with
                independent salons, nail bars, spas and other beauty service providers
                (“Partners”) for the purpose of booking appointments. VaraaAi does not itself
                provide or sell any beauty service — each Partner independently lists,
                manages and is responsible for its own services, prices and schedule on the
                platform.
              </p>
              <p>
                These Terms bind only you and VaraaAi. Booking through VaraaAi also means you
                agree to the individual booking conditions and cancellation policy of the
                Partner you booked with, as shown to you at the time of booking.
              </p>
              <p>
                In some cases, VaraaAi lets you pay a Partner in advance directly on the
                platform through a payment processor chosen by VaraaAi. In that case, VaraaAi
                (or its payment processor) only forwards the payment to the Partner and is not
                the seller of the service.
              </p>
              <p>
                VaraaAi may change, add to, or discontinue any feature of the VaraaAi Service
                at any time.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "3. Quyền và nghĩa vụ khi sử dụng dịch vụ" : "3. Your rights and obligations"}>
          {vi ? (
            <>
              <p>
                Bạn cam kết chỉ sử dụng Dịch vụ VaraaAi cho đúng mục đích mà nó được thiết kế:
                tìm kiếm và đặt lịch hẹn làm đẹp, hoặc — nếu bạn là chủ salon — quản lý dịch vụ
                và lịch hẹn của salon mình. Nghiêm cấm sử dụng Dịch vụ VaraaAi cho mục đích bất
                hợp pháp, gian lận, hoặc cạnh tranh không lành mạnh.
              </p>
              <p>
                Bạn cam kết cung cấp thông tin chính xác, trung thực khi đăng ký tài khoản và
                đặt lịch hẹn, và không đăng tải hay chia sẻ nội dung trái pháp luật hoặc trái
                thuần phong mỹ tục thông qua Dịch vụ VaraaAi.
              </p>
              <p>
                VaraaAi có quyền tạm ngừng hoặc chấm dứt quyền truy cập của Bạn vào Dịch vụ
                VaraaAi nếu VaraaAi có cơ sở cho rằng Bạn vi phạm Điều khoản này, pháp luật
                hiện hành, hoặc khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.
              </p>
            </>
          ) : (
            <>
              <p>
                You agree to use the VaraaAi Service only for its intended purpose: finding and
                booking beauty appointments, or — if you are a salon owner — managing your
                salon’s services and bookings. Using the VaraaAi Service for any unlawful,
                fraudulent, or unfair-competition purpose is strictly prohibited.
              </p>
              <p>
                You agree to provide accurate and truthful information when registering an
                account and booking an appointment, and not to upload or share unlawful or
                offensive content through the VaraaAi Service.
              </p>
              <p>
                VaraaAi may suspend or terminate your access to the VaraaAi Service if VaraaAi
                has reasonable grounds to believe you have violated these Terms, applicable
                law, or when required to do so by a competent authority.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "4. Đặt lịch, dời lịch và hủy lịch" : "4. Booking, rescheduling and cancellation"}>
          {vi ? (
            <>
              <p>
                Khi Bạn đặt lịch hẹn qua VaraaAi, Bạn đồng thời đồng ý với chính sách hủy lịch
                riêng của Đối tác đó, được hiển thị trước khi Bạn xác nhận đặt lịch. Chính sách
                hủy lịch có thể khác nhau tùy theo từng salon.
              </p>
              <p>
                Bạn có thể tự hủy hoặc theo dõi lịch hẹn của mình trong mục “Lịch hẹn của tôi”
                trên tài khoản VaraaAi, trong phạm vi thời gian mà chính sách hủy của Đối tác
                cho phép. Ngoài phạm vi đó, vui lòng liên hệ trực tiếp với salon.
              </p>
              <p>
                Đối tác có quyền chủ động dời lịch hẹn của Bạn sang thời gian khác khi cần
                thiết; trong trường hợp này Bạn sẽ nhận được email thông báo tự động với thời
                gian mới.
              </p>
            </>
          ) : (
            <>
              <p>
                When you book an appointment through VaraaAi, you also agree to that Partner’s
                own cancellation policy, shown to you before you confirm the booking.
                Cancellation policies may differ between salons.
              </p>
              <p>
                You can cancel or track your own appointments under “My bookings” in your
                VaraaAi account, within whatever window the Partner’s cancellation policy
                allows. Outside that window, please contact the salon directly.
              </p>
              <p>
                A Partner may reschedule your appointment to a different time when necessary;
                if this happens, you will receive an automatic email notification with the new
                time.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "5. Thanh toán" : "5. Payment"}>
          {vi ? (
            <>
              <p>
                Tùy theo từng salon, Bạn có thể thanh toán trực tiếp tại salon (tiền mặt hoặc
                thẻ), chuyển khoản ngân hàng theo thông tin salon cung cấp, hoặc — nếu salon
                bật tính năng này — thanh toán trực tuyến ngay trên VaraaAi thông qua đơn vị
                trung gian thanh toán.
              </p>
              <p>
                VaraaAi không giữ lại bất kỳ khoản phí nào từ khách hàng khi đặt lịch; toàn bộ
                số tiền thanh toán trực tuyến (nếu có) được chuyển đến Đối tác thông qua đơn vị
                trung gian thanh toán.
              </p>
            </>
          ) : (
            <>
              <p>
                Depending on the salon, you may pay directly at the salon (cash or card), by
                bank transfer using the details the salon provides, or — where the salon has
                enabled it — online directly on VaraaAi through a payment processor.
              </p>
              <p>
                VaraaAi does not withhold any fee from customers when booking; any amount paid
                online is forwarded to the Partner through the payment processor.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "6. Quyền riêng tư" : "6. Privacy"}>
          {vi ? (
            <>
              <p>
                Khi sử dụng Dịch vụ VaraaAi, Bạn cung cấp cho VaraaAi một số thông tin cá nhân
                trên cơ sở sự đồng ý của Bạn. Thông tin liên quan đến lịch hẹn của Bạn (họ tên,
                số điện thoại, email, ghi chú) sẽ được chia sẻ với Đối tác mà Bạn đặt lịch để
                Đối tác có thể phục vụ Bạn.
              </p>
              <p>
                VaraaAi sử dụng dữ liệu phát sinh từ việc sử dụng Dịch vụ để vận hành, khắc
                phục sự cố, cải thiện Dịch vụ, và — nếu Bạn đã đồng ý — cho mục đích tiếp thị.
                Bạn có thể yêu cầu xóa tài khoản và dữ liệu cá nhân của mình bất kỳ lúc nào
                bằng cách liên hệ <strong>info@varaaAi.com</strong>.
              </p>
            </>
          ) : (
            <>
              <p>
                By using the VaraaAi Service, you provide VaraaAi with certain personal data
                based on your consent. Information related to your appointment (name, phone
                number, email, notes) is shared with the Partner you booked with so they can
                serve you.
              </p>
              <p>
                VaraaAi uses data generated from using the Service to operate, troubleshoot and
                improve the Service, and — where you have consented — for marketing purposes.
                You may request deletion of your account and personal data at any time by
                contacting <strong>info@varaaAi.com</strong>.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "7. Trách nhiệm và giới hạn trách nhiệm" : "7. Liability"}>
          {vi ? (
            <>
              <p>
                VaraaAi không chịu trách nhiệm về nội dung, chất lượng, sự an toàn, hay bất kỳ
                khía cạnh nào khác của dịch vụ do Đối tác cung cấp. Mọi khiếu nại liên quan đến
                dịch vụ đã đặt (như chất lượng dịch vụ, việc hủy hay dời lịch) cần được gửi
                trực tiếp đến Đối tác.
              </p>
              <p>
                Dịch vụ VaraaAi được cung cấp trên cơ sở “nguyên trạng”. VaraaAi không đảm bảo
                Dịch vụ VaraaAi hoạt động liên tục, không lỗi, hay hoàn toàn không có sự cố kỹ
                thuật, và không chịu trách nhiệm về thiệt hại phát sinh trực tiếp hoặc gián
                tiếp từ việc sử dụng Dịch vụ VaraaAi hoặc dịch vụ của Đối tác.
              </p>
            </>
          ) : (
            <>
              <p>
                VaraaAi is not responsible for the content, quality, safety, or any other
                aspect of the services provided by a Partner. Any complaint about a booked
                service (such as service quality, cancellation or rescheduling) must be sent
                directly to the Partner.
              </p>
              <p>
                The VaraaAi Service is provided on an “as is” basis. VaraaAi does not guarantee
                uninterrupted, error-free operation of the VaraaAi Service, and is not liable
                for any direct or indirect damage arising from the use of the VaraaAi Service
                or a Partner’s services.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "8. Sở hữu trí tuệ" : "8. Intellectual property"}>
          <p>
            {vi
              ? "Toàn bộ quyền sở hữu và quyền sở hữu trí tuệ đối với Dịch vụ VaraaAi thuộc về Moja Investors Oy hoặc các đối tác cấp phép của Moja Investors Oy."
              : "All ownership and intellectual property rights in the VaraaAi Service belong to Moja Investors Oy or its licensing partners."}
          </p>
        </Section>

        <Section title={vi ? "9. Hiệu lực và thay đổi điều khoản" : "9. Validity and changes to these Terms"}>
          {vi ? (
            <>
              <p>
                Bạn có thể ngừng sử dụng Dịch vụ VaraaAi bất kỳ lúc nào bằng cách yêu cầu xóa
                tài khoản. VaraaAi có thể tạm ngừng hoặc chấm dứt quyền truy cập của Bạn nếu có
                lý do chính đáng.
              </p>
              <p>
                VaraaAi có thể sửa đổi Điều khoản này vào bất kỳ lúc nào. Việc Bạn tiếp tục sử
                dụng Dịch vụ VaraaAi sau khi Điều khoản được sửa đổi đồng nghĩa với việc Bạn
                chấp nhận các thay đổi đó. Nếu không đồng ý, Bạn cần ngừng sử dụng Dịch vụ
                VaraaAi.
              </p>
            </>
          ) : (
            <>
              <p>
                You may stop using the VaraaAi Service at any time by requesting deletion of
                your account. VaraaAi may suspend or terminate your access for good reason.
              </p>
              <p>
                VaraaAi may amend these Terms at any time. Continuing to use the VaraaAi
                Service after the Terms have been amended means you accept the changes. If you
                do not agree, you must stop using the VaraaAi Service.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "10. Chuyển giao quyền" : "10. Assignment"}>
          <p>
            {vi
              ? "Moja Investors Oy có quyền chuyển giao Dịch vụ VaraaAi, cũng như các quyền và nghĩa vụ theo Điều khoản này, cho bất kỳ bên thứ ba nào mà không cần sự đồng ý trước của Bạn."
              : "Moja Investors Oy may transfer the VaraaAi Service, along with the rights and obligations under these Terms, to any third party without your prior consent."}
          </p>
        </Section>

        <Section title={vi ? "11. Luật áp dụng và giải quyết tranh chấp" : "11. Governing law and dispute resolution"}>
          {vi ? (
            <>
              <p>
                Điều khoản này chịu sự điều chỉnh của pháp luật Phần Lan. Mọi tranh chấp phát
                sinh trước tiên sẽ được giải quyết thông qua thương lượng thiện chí. Nếu không
                đạt được thỏa thuận, tranh chấp có thể được đưa ra giải quyết tại Tòa án quận
                Helsinki (Helsingin käräjäoikeus) là tòa án có thẩm quyền đầu tiên.
              </p>
              <p>
                Đối với khách hàng là người tiêu dùng, các quyền bắt buộc theo pháp luật bảo vệ
                người tiêu dùng tại nơi cư trú của Bạn vẫn được áp dụng và không bị hạn chế bởi
                Điều khoản này.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms are governed by the laws of Finland. Any dispute will first be
                addressed through good-faith negotiation. If no agreement is reached, the
                dispute may be brought before the Helsinki District Court (Helsingin
                käräjäoikeus) as the court of first instance.
              </p>
              <p>
                For consumers, the mandatory consumer-protection rights of your own country of
                residence still apply and are not limited by these Terms.
              </p>
            </>
          )}
        </Section>

        <Section title={vi ? "12. Liên hệ" : "12. Contact"}>
          <div className="rounded-2xl bg-mist-50 p-5">
            <p className="font-semibold text-ink-900">Moja Investors Oy</p>
            <p>{vi ? "Mã số doanh nghiệp" : "Business ID"}: 3555331-8</p>
            <p>{vi ? "Địa chỉ" : "Address"}: Hakaniemen torikatu 2 L 48, 00530 Helsinki</p>
            <p>Email: info@varaaAi.com</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-ink-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
