import { Inject, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository: typeof Portfolio,
  ) {}
  create(createPortfolioDto: CreatePortfolioDto) {
    const portfolioData = {
      ...createPortfolioDto,
    };
    return this.portfolioRepository.create(portfolioData);
  }

  findAllByUser(id: number) {
    return this.portfolioRepository.findAll({
      where: { user_id: id },
      include: [Image],
    });
  }

  findOne(id: number) {
    return this.portfolioRepository.findOne({
      where: { id },
      include: [Image],
    });
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    const portfolioData = {
      ...updatePortfolioDto,
    };
    return this.portfolioRepository.update(portfolioData, { where: { id } });
  }

  remove(id: number) {
    return this.portfolioRepository.destroy({ where: { id } });
  }
}