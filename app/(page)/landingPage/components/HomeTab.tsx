"use client";

import { Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Image from "next/image";
const ContentSection = styled(Stack)({
    alignItems: 'center',
    textAlign: 'center',
    padding: "24px"
});
const HeadingSection = styled(Typography)({
    fontSize: '40px',
    color: '#292929',
    alignItems: 'center',
    justifyItems: 'center',
})
const SubHeadingSection = styled(Typography)({
    // fontSize: '20px',
    color: '#292929',
    lineHeight: 1.25,
    fontWeight: 500,
});
const StackVideo = styled(Stack)({
    margin: '60px 0px',
});

const BoxImage = styled(Box)({
    position: "relative",
    minHeight: "300px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "0px",
    cursor: "pointer",
    "& img": {
        transition: "transform 0.4s ease",
    },
    "&:hover img": {
        transform: "scale(1.1)",
    },
});
const CardImageSection = styled(Card)({
    width: "100%",
    borderRadius: 0,
    boxShadow: "none"
})
const CardContentStyled = styled(CardContent)({
    textAlign: "center",
    paddingTop: "16px"
})
const ImageTextSection = styled(Box)({
    paddingTop: "24px"
})
const ImageTitle = styled(Typography)({
    marginBottom: "0px"
})
const ImageSubTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    paddingTop: "16px"
}));
const ContentTrustSection = styled(ContentSection)({
    backgroundColor: "#F6F7F9",
    minHeight: "300px",
    padding: "114px 24px"
})
const BoxTrustSection = styled(Box)({
    height: "100%",
    backgroundColor: "#fff",
    padding: "32px",
    textAlign: "left",

})
const TitleTrustSection = styled(Typography)(({ theme }) => ({
    fontSize: "32px",
    color: theme.palette.text.primary,
    lineHeight: 1.2,
}));
const SubTitleTrustSection = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    fontWeight: "500",

}))
const TextSatistics = styled(Typography)({
    color: "#0068FF",
    fontSize: "64px",
    margin: 0,
    lineHeight: 1,
})
const HomeTab = () => {
    return <Stack gap={7} data-testid="home-tab">
        <ContentSection >
            <Container maxWidth="md">
                <Stack alignItems={'center'} spacing={2}>
                    <Typography variant="h3"
                        sx={{
                            fontWeight: 500,
                            lineHeight: 1.1,
                            textAlign: "center",
                            maxWidth: 900,
                            wordBreak: "keep-all",
                        }}
                    >
                        Phát triển{" "}
                        <span style={{ color: "#2563eb" }}>Internet</span>,<br />
                        thay đổi{" "}
                        <span style={{ color: "#14b8a6" }}>cuộc sống</span> người Việt Nam
                    </Typography>

                    <SubHeadingSection variant="h6">
                        Từ ứng dụng nhắn tin phổ biến nhất Việt Nam đến công nghệ AI tiên tiến, những sản phẩm của Zalo đang hỗ trợ cuộc sống hằng ngày của hàng chục triệu người.
                    </SubHeadingSection>
                </Stack>
            </Container>
            <StackVideo>
                <video src="https://zalo-site.zadn.vn/videos/home-vi.mp4" autoPlay muted loop playsInline />
            </StackVideo>
        </ContentSection>
        <ContentSection data-testid="home-tab-effort-section" spacing={5}>
            <Box>
                <HeadingSection>Nỗ lực và dấu ấn của Zalo</HeadingSection>
                <SubHeadingSection variant="h6">
                    Tìm hiểu cách Zalo xây dựng sản phẩm, phát triển công nghệ và đóng góp cho xã hội.
                </SubHeadingSection>
            </Box>

            <Grid container spacing={4} sx={{ mt: 2, width: "100%" }}>
                {/* Card 1 */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <CardImageSection >
                        <CardMedia>
                            <BoxImage >
                                <Image
                                    src="/images/pic1.webp"
                                    alt="pic1"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </BoxImage>
                        </CardMedia>

                        <CardContentStyled >
                            <ImageTextSection>
                                <ImageTitle variant="h5" gutterBottom>
                                    Sản phẩm và dịch vụ
                                </ImageTitle>
                                <ImageSubTitle variant="body1">
                                    Nhắn tin liên lạc, âm nhạc, tin tức, trợ lý AI - những sản phẩm của chúng tôi đã trở thành một phần không thể thiếu trong đời sống hàng ngày.
                                </ImageSubTitle>
                            </ImageTextSection>
                        </CardContentStyled>
                    </CardImageSection>
                </Grid>

                {/* Card 2 */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <CardImageSection ><CardMedia>
                        <BoxImage >
                            <Image
                                src="/images/pic2.webp"
                                alt="pic2"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </BoxImage>
                    </CardMedia>

                        <CardContent>
                            <ImageTextSection>
                                <ImageTitle variant="h5" gutterBottom>
                                    AI và Công nghệ
                                </ImageTitle>
                                <ImageSubTitle variant="body1" >
                                    AI của chúng tôi có khả năng hiểu tốt ngôn ngữ,  nhu cầu bản địa; giúp tăng hiệu suất, và sự tiện lợi cho người dùng trên hệ sinh thái.
                                </ImageSubTitle>
                            </ImageTextSection>
                        </CardContent>
                    </CardImageSection>
                </Grid>

                {/* Card 3 */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <CardImageSection >
                        <CardMedia>
                            <BoxImage >
                                <Image
                                    src="/images/pic3.webp"
                                    alt="pic3"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </BoxImage>
                        </CardMedia>

                        <CardContent>
                            <ImageTextSection>
                                <ImageTitle variant="h5" gutterBottom>
                                    Ảnh hưởng và trách nhiệm
                                </ImageTitle>
                                <ImageSubTitle variant="body1" >
                                    Chúng tôi đầu tư vào chuyển đổi số, quyền riêng tư, AI và hơn thế nữa. Với Zalo, công nghệ để phụng sự con người phải được kiến tạo từ trách nhiệm.
                                </ImageSubTitle>
                            </ImageTextSection>
                        </CardContent>
                    </CardImageSection>
                </Grid>
            </Grid>
        </ContentSection>
        <ContentTrustSection spacing={5} data-testid="home-tab-trust-section" >
            <Box pb={3}>
                <HeadingSection>Từ thói quen đến niềm tin </HeadingSection>
                <Container maxWidth="md" >
                    <SubHeadingSection variant="h6">
                        Đó là cách hàng chục triệu người dùng tin cậy sử dụng thường xuyên các sản phẩm của Zalo để kết nối, giúp cuộc sống tiện lợi và cho nhiều mục đích khác.
                    </SubHeadingSection>
                </Container>

            </Box>
            <Grid width="100%" container spacing={4} direction="column">
                <Grid container alignItems="stretch" spacing={4}>
                    <Grid size={6}>
                        <Box sx={{ height: "100%" }}>
                            <BoxImage height={350}>
                                <Image

                                    src="https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpeople.3932e46d.png&w=3840&q=75"
                                    fill
                                    alt=""
                                />
                            </BoxImage>
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <BoxTrustSection>
                            <Stack height="100%" justifyContent="space-between">
                                <Box>
                                    <TitleTrustSection>Zalo</TitleTrustSection>
                                    <SubTitleTrustSection color="text.secondary">Ứng dụng liên lạc số 1 Việt Nam</SubTitleTrustSection>
                                </Box>
                                <Grid container width="100%">
                                    <Grid size={6}>
                                        <Stack>
                                            <TextSatistics>2B+</TextSatistics>
                                            <SubTitleTrustSection color="text.primary">tin nhắn mỗi ngày</SubTitleTrustSection>
                                        </Stack>
                                    </Grid>
                                    <Grid size={6}>
                                        <Stack>
                                            <TextSatistics>79M+</TextSatistics>
                                            <SubTitleTrustSection color="text.primary">người dùng</SubTitleTrustSection>
                                        </Stack>
                                    </Grid>
                                </Grid>

                            </Stack>
                        </BoxTrustSection>
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: "stretch" }}>
                    <Grid size={3}>
                        <BoxImage sx={{ height: "100%" }}>
                            <Image
                                fill
                                src="https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkiki.d715d09c.webp&w=3840&q=75"
                                alt=""
                            />
                        </BoxImage>
                    </Grid>

                    <Grid size={3}>
                        <BoxImage sx={{ height: "100%" }}>
                            <Image
                                fill
                                src="https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkiki.d715d09c.webp&w=3840&q=75"
                                alt=""
                            />
                        </BoxImage>
                    </Grid>

                    <Grid size={3}>
                        <video
                            src="https://zalo-site.zadn.vn/videos/zalo-video-thumb.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </Grid>

                    <Grid size={3}>
                        <BoxImage height="100%">
                            <Image
                                fill
                                src="https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkiki.d715d09c.webp&w=3840&q=75"
                                alt=""
                            />
                        </BoxImage>
                    </Grid>
                </Grid>
            </Grid>
        </ContentTrustSection>
        <ContentSection></ContentSection>
    </Stack>
}
export default HomeTab;