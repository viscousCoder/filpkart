import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const images = [
  {
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR6uNfFjyxbHk7rt7xWsAOMfp13kDtNJmpu-_TBC_4IdEGfdL85xoIvBODz5Eh2J_1oAO0GRMC5SeaIo2VCFK-rTY6Hk6RBe952uadvORV6FpL1R-A199y7lQ&usqp=CAE",
    title: "Addidas",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://rukminim3.flixcart.com/image/850/1000/kpodocw0/short/y/p/o/32-12919570-roadster-original-imag3urg4sgqasfr.jpeg?q=90&crop=false",
    title: "Roadster",
  },
  {
    img: "https://media.istockphoto.com/id/1362931487/photo/people-celebrating-new-years-eve-in-goa-india.jpg?s=612x612&w=0&k=20&c=FBUwKwALo6BCnIlchchcxmXbaiWDPG3TysQoyRbKVmk=",
    title: "Beach Party",
  },
  {
    img: "https://d26dp53kz39178.cloudfront.net/media/uploads/Location_Based_Travel_Guide_Images/image1_result_3_xfYVt05.webp",
    title: "Boating",
    cols: 2,
  },
  {
    img: "https://www.trvme.com/img/tours/mumbai-to-goa-cycling-im1.jpg",
    title: "Cycling",
    cols: 2,
  },
  {
    img: "https://rukminim2.flixcart.com/image/300/600/xif0q/smartwatch/l/u/a/-original-imagr6xtvzwunhup.jpeg?q=20",
    title: "Rafting",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
    title: "Trekking",
  },
  {
    img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/hand-messenger-bag/3/8/m/-original-imaggbwdcd82fetd.jpeg?q=90&crop=false",
    title: "Handbags",
  },
  {
    img: "https://www.seawatersports.com/images/activies/slide/angling-in-uttarakhand-price.jpg",
    title: "Fishing",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://www.chardham-tours.com/wp-content/uploads/2020/01/bungee-jumping-rishikesh-short.jpg",
    title: "Bungee Jumping",
  },
  {
    img: "https://media1.thrillophilia.com/filestore/78wgk6ddct4mrovnhybt6iqz44n9_d7%20(1).jpg",
    title: "Water Park",
  },
  {
    img: "https://rukminim2.flixcart.com/image/144/144/xif0q/smartwatch/q/i/r/-original-imagu7kzfk3kuc9j.jpeg?q=30",
    title: "Camp Fire",
    cols: 2,
  },
];

const ImageButton = styled(ButtonBase)(() => ({
  position: "relative",
  height: "100%",
  width: "100%",
  display: "block",
  "&:hover .MuiImageBackdrop-root": {
    opacity: 0.2,
  },
  "&:hover .MuiTypography-root": {
    borderBottom: "2px solid white",
  },
}));

const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

// const ImageOverlayText = styled("span")(({ theme }) => ({
//   position: "absolute",
//   bottom: 10,
//   left: "50%",
//   transform: "translateX(-50%)",
//   color: theme.palette.common.white,
//   fontSize: "1.5rem",
//   fontWeight: "bold",
// }));
const ImageOverlayText = styled(Typography)<{ component: string }>(
  ({ theme }) => ({
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    color: theme.palette.common.white,
    fontSize: "1.5rem",
    fontWeight: "bold",
  })
);

export default function MixImage() {
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Enjoy the places with fun activities.
      </Typography>
      <Box sx={{ maxWidth: "100%", mx: "auto", mt: 4 }}>
        <ImageList
          sx={{ width: "100%", height: "auto" }}
          variant="quilted"
          cols={4}
          rowHeight={300}
        >
          {images.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <ImageButton
                focusRipple
                style={{ height: "100%", width: "100%" }}
              >
                <StyledImg src={item.img} alt={item.title} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <ImageOverlayText variant="subtitle1" component="span">
                  {item.title}
                </ImageOverlayText>
              </ImageButton>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
